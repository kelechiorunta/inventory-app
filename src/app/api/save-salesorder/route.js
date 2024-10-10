import connectToDatabase from '@/app/utils/db/db';
import SessionUser from '@/app/utils/models/SessionUser'; // SessionUser and Stock models
import SalesOrder from '@/app/utils/models/SalesOrder';
import InventoryProduct from '@/app/utils/models/InventoryProduct';
import Stock from '@/app/utils/models/Stock';
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

// Middleware to check authentication (implement with your existing auth flow)
async function getAuthenticatedUser(req) {
  // Assuming you have a way to get the authenticated user from the session
  const session = await getSession({ req });
  return session?.user;
}

export async function POST(req, res) {
  const data = await req.json();
  const { name, code, type, price, quantity, reciept, plan, paymentStatus } = data;

  try {
    
    const secret = process.env.NEXTAUTH_SECRET

    const session = await getToken({req , secret});
    console.log(session, "hello")
    const user = session

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find the authenticated user in the SessionUser collection
    let sessionUser = await SessionUser.findOne({ user_email: user.email }).populate('salesorders_list', 'products_list');

    // If the session user doesn't exist, create a new one
    if (!sessionUser) {
        sessionUser = new SessionUser({ user_email: user.email, salesorders_list: [] });
    }

    // Find stock by month and year (or create a new stock entry if not found)
    let list = await SalesOrder.findOne({name, code, _id:sessionUser.salesorders_list});
    let product = await InventoryProduct.findOne({name, code, _id:sessionUser.products_list});

    if (!list) {
      list = new SalesOrder({ name, code, type, price, quantity, reciept, plan, paymentStatus });
      product.quantity = product.quantity - quantity
      await list.save(); // Save the new stock entry
      await product.save();
    } else {
      // Update the existing stock entry
      list.name = name;
      list.code = code
      list.type = type;
      list.price = price;
      list.quantity = Number(list.quantity) + Number(quantity);
      list.reciept = reciept;
      list.plan = plan
      list.paymentStatus = paymentStatus
      product.quantity = product.quantity - quantity
      await list.save();
      await product.save()
    }

    
    // Add the stock reference to the user's stock array if it's not already there
    if (!sessionUser.salesorders_list.some(s => s.equals(list._id))) {
      sessionUser.salesorders_list.push(list._id);
    }

    // Save the updated SessionUser
    await sessionUser.save();

    // Return a success response
    return NextResponse.json(
      { message: 'Stock saved successfully', data: sessionUser }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving stock data:', error);

    return NextResponse.json({ error: 'Failed to save stock data' }, { status: 500 });
  }
}

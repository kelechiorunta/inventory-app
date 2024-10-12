import connectToDatabase from '@/app/utils/db/db';
import SessionUser from '@/app/utils/models/SessionUser'; // SessionUser and Stock models
import Stock from '@/app/utils/models/Stock';
import Supplier from '@/app/utils/models/Supplier';
import InventoryProduct from '@/app/utils/models/InventoryProduct';
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
//   const { name, code, type, price, quantity, image } = data
  const { name, contactInfo, products } = data;
//   const { phone, email, address } = contactInfo

  try {
    
    const secret = process.env.NEXTAUTH_SECRET

    const session = await getToken({req , secret});
    console.log(session, "hello")
    const user = session

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find the authenticated user in the SessionUser collection
    let sessionUser = await SessionUser.findOne({ user_email: user.email }).populate('suppliers_list');

    // If the session user doesn't exist, create a new one
    if (!sessionUser) {
        sessionUser = new SessionUser({ user_email: user.email, suppliers_list: [] });
    }

    // Find stock by month and year (or create a new stock entry if not found)
    let supplier = await Supplier.findOne({name, _id:sessionUser.suppliers_list});

    if (!supplier) {
      supplier = new Supplier({
        name,
        contactInfo,
        products,
      });
      await supplier.save(); // Save the new stock entry
    } else {
      // Update the existing stock entry
      supplier.name = name
      supplier.contactInfo = contactInfo//{...supplier.contactInfo, phone, email, address}
      supplier.products = products
      await supplier.save();
    }

    // Add the stock reference to the user's stock array if it's not already there
    if (!sessionUser.suppliers_list.some(s => s.equals(supplier._id))) {
      sessionUser.suppliers_list.push(supplier._id);
    }

    // Save the updated SessionUser
    await sessionUser.save();

    // Return a success response
    return NextResponse.json(
      { message: 'Supplier saved successfully', data: sessionUser }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving stock data:', error);

    return NextResponse.json({ error: 'Failed to save stock data' }, { status: 500 });
  }
}
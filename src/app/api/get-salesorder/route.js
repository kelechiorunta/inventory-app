import connectToDatabase from '@/app/utils/db/db';
import SessionUser from '@/app/utils/models/SessionUser';
import InventoryProduct from '@/app/utils/models/InventoryProduct';
import SalesOrder from '@/app/utils/models/SalesOrder';
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { auth } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import Stock from '@/app/utils/models/Stock';

// Middleware to check authentication (implement with your existing auth flow)
async function getAuthenticatedUser(req,res,auth) {
  // Assuming you are using next-auth, you can use the getSession function to get the logged-in user
  const session = await getServerSession({ req, res, auth });
   console.log(session)
  return session?.user;  // Get the authenticated user
}

export async function GET(req, res) {
  try {
    // Connect to the database
    // await connectToDatabase();

    // Get the authenticated user
    // const user = await getAuthenticatedUser(req, res, auth);
    const secret = process.env.NEXTAUTH_SECRET

    const session = await getToken({req , secret});
    console.log(session, "hello")
    const user = session

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find the SessionUser for the authenticated user and populate their stocks
    const sessionUser = await SessionUser.findOne({ user_email: user.email }).populate('salesorders_list');

    if (!sessionUser) {
      return NextResponse.json({ message: 'No stock data found for this user' }, { status: 404 });
    }

    // sessionUser.stocks.forEach(item => {

    // })
    const getsalesOrders = await SalesOrder.find({ _id : sessionUser.salesorders_list })
    // Return the user's stock data
    return NextResponse.json({ salesorders: getsalesOrders}, { status: 200 });

  } catch (error) {
    console.error('Error fetching user stock data:', error);

    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}

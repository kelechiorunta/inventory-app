// // pages/api/get-products.js
// import connectMongo from '../../lib/mongodb';
// import Product from '../../models/Product';
// import InventoryProduct from '@/app/utils/models/InventoryProduct';

// export async function GET(req, res) {
// //   await connectMongo();

//     try {
//       const products = await Product.find();
//       res.status(200).json(products);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching products' });
//     }

// }

import connectToDatabase from '@/app/utils/db/db';
import SessionUser from '@/app/utils/models/SessionUser';
import InventoryProduct from '@/app/utils/models/InventoryProduct';
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
    const sessionUser = await SessionUser.findOne({ user_email: user.email }).populate('products_list');

    if (!sessionUser) {
      return NextResponse.json({ message: 'No stock data found for this user' }, { status: 404 });
    }

    // sessionUser.stocks.forEach(item => {

    // })
    const getproducts = await InventoryProduct.find({ _id : sessionUser.products_list })
    // Return the user's stock data
    return NextResponse.json({ products: getproducts}, { status: 200 });

  } catch (error) {
    console.error('Error fetching user stock data:', error);

    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}

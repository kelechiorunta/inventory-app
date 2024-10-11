// // pages/api/create-product.js
// import connectMongo from '../../lib/mongodb';
// import Product from '../../models/Product';
// import InventoryProduct from '@/app/utils/models/InventoryProduct';

// export async function POST(req, res) {
// //   await connectMongo();

//     try {
//       const data = await req.json();

//       const { name, code, type, price, quantity, image } = data

//       // Save the product data, including the image (Base64 string)
//       const newProduct = new InventoryProduct({
//         name,
//         code,
//         type,
//         price,
//         quantity,
//         image,  // Save the image as Base64 string in MongoDB
//       });

//       await newProduct.save();
//       res.status(201).json(newProduct);
//     } catch (error) {
//       res.status(500).json({ message: 'Error creating product' });
//     }
  
// }


import connectToDatabase from '@/app/utils/db/db';
import SessionUser from '@/app/utils/models/SessionUser'; // SessionUser and Stock models
import Stock from '@/app/utils/models/Stock';
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
  const { name, code, type, price, quantity, image } = data

  try {
    
    const secret = process.env.NEXTAUTH_SECRET

    const session = await getToken({req , secret});
    console.log(session, "hello")
    const user = session

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find the authenticated user in the SessionUser collection
    let sessionUser = await SessionUser.findOne({ user_email: user.email }).populate('products_list');

    // If the session user doesn't exist, create a new one
    if (!sessionUser) {
        sessionUser = new SessionUser({ user_email: user.email, products_list: [] });
    }

    // Find stock by month and year (or create a new stock entry if not found)
    let product = await InventoryProduct.findOne({name, code, _id:sessionUser.products_list});

    if (!product) {
      product = new InventoryProduct({ name, code, type, price, quantity, image });
      await product.save(); // Save the new stock entry
    } else {
      // Update the existing stock entry
      product.type = type;
      product.price = price;
      product.quantity = quantity;
      product.image = image;
      await product.save();
    }

    // Add the stock reference to the user's stock array if it's not already there
    if (!sessionUser.products_list.some(s => s.equals(product._id))) {
      sessionUser.products_list.push(product._id);
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

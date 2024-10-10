// import connectToDatabase from '@/app/utils/db/db';
// import { NextResponse } from 'next/server';
// import Cors from 'cors';
// import User from '@/app/utils/models/User';
// import Stock from '@/app/utils/models/Stock';

// // Initialize CORS middleware
// const cors = Cors({
//   methods: ['GET', 'POST', 'HEAD'],
//   origin: '*', // Adjust this to be more restrictive if needed
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization'],
// });

// // A helper function to run the middleware
// async function runCors(req) {
//   return new Promise((resolve, reject) => {
//     cors(req, {
//       end: resolve,
//       next: resolve,
//       onError: reject,
//     });
//   });
// }

// export async function POST(req, res) {
//     const data = await req.json();
//     const { month, year, stockIn, stockOut } = data;
  
//     console.log(data);
  
//     try {
//       // Connect to the database
//       await connectToDatabase();
  
//       if (month && year && stockIn && stockOut) {
//         // Use findOneAndUpdate with upsert: true
//         const updatedStock = await Stock.findOneAndUpdate(
//           { month: month }, // Filter to find the stock by month
//           { month, year, stockIn, stockOut }, // Fields to update (or insert)
//           { new: true, upsert: true } // Create a new document if no match is found (upsert)
//         );
  
//         console.log('Saved successfully');
  
//         // Return success response
//         return NextResponse.json(
//           { message: "Saved successfully", data: updatedStock }, 
//           { status: 200 }
//         );
//       }
  
//       // Return bad request response if required fields are missing
//       return NextResponse.json(
//         { error: "Missing required fields" }, 
//         { status: 400 }
//       );
//     } catch (error) {
//       console.error('Error saving stock data:', error);
  
//       // Return error response
//       return NextResponse.json(
//         { error: 'Failed to save stock data' }, 
//         { status: 500 }
//       );
//     }
//   }

import connectToDatabase from '@/app/utils/db/db';
import SessionUser from '@/app/utils/models/SessionUser'; // SessionUser and Stock models
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
  const { month, year, stockIn, stockOut } = data;

  try {
    // Connect to the database
    // await connectToDatabase();

    // Get authenticated user
    // const user = await getAuthenticatedUser(req);
    // const session = await getSession({ req });
    // console.log(session)
    // const user = session?.user
    const secret = process.env.NEXTAUTH_SECRET

    const session = await getToken({req , secret});
    console.log(session, "hello")
    const user = session

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find the authenticated user in the SessionUser collection
    let sessionUser = await SessionUser.findOne({ user_email: user.email }).populate('stocks');

    // If the session user doesn't exist, create a new one
    if (!sessionUser) {
        sessionUser = new SessionUser({ user_email: user.email, stocks: [] });
    }

    // Find stock by month and year (or create a new stock entry if not found)
    let stock = await Stock.findOne({month, _id:sessionUser.stocks});

    if (!stock) {
      stock = new Stock({ month, year, stockIn, stockOut });
      await stock.save(); // Save the new stock entry
    } else {
      // Update the existing stock entry
      stock.stockIn = stockIn;
      stock.stockOut = stockOut;
      await stock.save();
    }

    // Add the stock reference to the user's stock array if it's not already there
    if (!sessionUser.stocks.some(s => s.equals(stock._id))) {
      sessionUser.stocks.push(stock._id);
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

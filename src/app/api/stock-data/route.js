import connectToDatabase from '@/app/utils/db/db';
import { NextResponse } from 'next/server';
import Cors from 'cors';
import User from '@/app/utils/models/User';
import Stock from '@/app/utils/models/Stock';

// // Initialize CORS middleware
// const cors = Cors({
//   methods: ['GET', 'HEAD'],
//   origin: '*', // Adjust this to be more restrictive if needed
//   credentials: true,
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

export async function GET(req, ) {
  try {
    // Ensure CORS is run before proceeding
    // await runCors(req);

    // Connect to the database
     const { db } = await connectToDatabase();

    // Fetch stock data from the "stocks" collection
    const stockData = [
        {
          "month": "January",
          "year": 2024,
          "stockIn": 10000,
          "stockOut": 8000
        },
        {
          "month": "February",
          "year": 2024,
          "stockIn": 12000,
          "stockOut": 9500
        },
        {
          "month": "March",
          "year": 2024,
          "stockIn": 15000,
          "stockOut": 13000
        },
        {
          "month": "April",
          "year": 2024,
          "stockIn": 18000,
          "stockOut": 16000
        },
        {
          "month": "May",
          "year": 2024,
          "stockIn": 18000,
          "stockOut": 16000
        },
        // More months...
      ]
      //{message:"Hello"}
      
    const stocks = await Stock.find({})//db.collection('users').find({}).toArray();

    // Return the data as a JSON response
    return NextResponse.json(stocks, { status: 200 });
  } catch (error) {
    console.error('Error fetching stock data:', error); // Log the actual error

    // Return a 500 response with the error message
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}



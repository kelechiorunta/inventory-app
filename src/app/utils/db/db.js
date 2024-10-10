import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectToDatabase;

// import { MongoClient } from 'mongodb';

// let cachedDb = null;

// export default async function connectToDatabase() {
//   if (cachedDb) {
//     return { db: cachedDb };
//   }

//   const client = new MongoClient(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   try {
//     await client.connect();

//     // Use the default database specified in the URI
//     cachedDb = client.db();  // This will use the database in the URI if specified
//     return { db: cachedDb };
//   } catch (error) {
//     console.error('Failed to connect to the database:', error);
//     throw new Error('Failed to connect to the database');
//   }
// }


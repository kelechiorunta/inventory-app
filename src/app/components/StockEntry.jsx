'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
// import Stock from '../utils/models/Stock';

const StockEntry = () => {
  const router = useRouter();
  
  // State to hold input values for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stockEntries, setStockEntries] = useState({month:'', year:'', stockIn:'', stockOut:''})
  const [error, setError] = useState('');

  const handleStockEntry = (e) => {
    const {name, value} = e.target
    setStockEntries(prevEntries => ({
        ...prevEntries, [name] : value
    }))
    console.log(stockEntries)
  }

  // Handles sign in with credentials
  const handleStockRequest = async (e) => {
    e.preventDefault();
    const { month, year, stockIn, stockOut } = stockEntries
    const entries = { month, year, stockIn, stockOut }
    try{    
        const response = await axios.post('/api/stock-entry', entries, {
            withCredentials:true,
            headers: {
                'Content-Type': 'application/json', // Set the correct headers for JSON data
              },
        })//await axios.post('/api/stock-entry', entries, {withCredentials:true})
            console.log(response.data)
    }
        catch(err){
            console.error(err.message)
        }

  };

  // Handles sign in with Google
  const handleSignInWithGoogle = async () => {
    await signIn('google', { callbackUrl: '/dashboard/main' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Enter Stock Details
        </h2>

        {/* Sign In Form */}
        <form onSubmit={handleStockRequest} className="mt-8 space-y-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Month
              </label>
              <input
                id="month"
                name="month"
                type="text"
                autoComplete="month"
                required
                value={stockEntries.month}
                onChange={handleStockEntry}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter Month"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Year
              </label>
              <input
                id="year"
                name="year"
                type="number"
                autoComplete="year"
                required
                value={stockEntries.year}
                onChange={handleStockEntry}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter Year"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                StockIn
              </label>
              <input
                id="stockIn"
                name="stockIn"
                type="number"
                autoComplete="stockIn"
                required
                value={stockEntries.stockIn}
                onChange={handleStockEntry}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter StockIn"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                StockOut
              </label>
              <input
                id="stockOut"
                name="stockOut"
                type="number"
                autoComplete="stockOut"
                required
                value={stockEntries.stockOut}
                onChange={handleStockEntry}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter StockOut"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in with Credentials
            </button>
          </div>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500">Or</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleSignInWithGoogle}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default StockEntry;
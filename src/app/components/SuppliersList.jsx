'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaEdit } from 'react-icons/fa';

const SuppliersList = () => {
  // State for suppliers and search query
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch suppliers from API on component mount
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('/api/get-suppliers', { withCredentials: true });
        setSuppliers(response.data || []); // Set data or fallback to an empty array
      } catch (error) {
        console.error('Error fetching suppliers', error);
      }
    };
    fetchSuppliers();
  }, []);

  // Filter suppliers based on search query
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Suppliers</h1>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-64"
          />
          <FaSearch className="absolute top-3 right-3 text-gray-500" />
        </div>

        {/* Edit Button */}
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2">
          <FaEdit /> Edit Suppliers
        </button>
      </div>

      {/* Suppliers Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left table-auto">
          <thead>
            <tr className="text-gray-700">
              <th className="px-6 py-3">Supplier Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Contact No.</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((supplier) => (
              <tr key={supplier.id} className="border-b">
                <td className="px-6 py-3 flex items-center gap-3">
                  <span className="text-2xl">{supplier.logo}</span>
                  <span>{supplier.name}</span>
                </td>
                <td className="px-6 py-3">{supplier.email}</td>
                <td className="px-6 py-3">{supplier.contactNo}</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer hover:underline">Order History</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Show message if no suppliers match the search */}
        {filteredSuppliers.length === 0 && (
          <p className="text-gray-500 mt-4">No suppliers found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default SuppliersList;

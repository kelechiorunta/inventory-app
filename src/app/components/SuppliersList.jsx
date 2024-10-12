'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaEdit } from 'react-icons/fa';
import TableLayout from './TableLayout';
import { getInventoryProducts } from '../utils/actions/actions';

const headers = [
  { key: 'Name', label: 'Name', scope: 'col' },
  { key: 'Email', label: 'Email', scope: 'col' },
  // { key: 'Address', label: 'Address', scope: 'col' },
  { key: 'Contact', label: 'Contact No.', scope: 'col' },
  { key: 'Product', label: 'Product', scope: 'col' },
  
];

const SuppliersList = () => {
  // State for suppliers and search query
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch suppliers from API on component mount
  useEffect(() => {
    
    const cachedSuppliers = localStorage.getItem('suppliers');
    const cachedProduct = localStorage.getItem('product');

    // if (cachedSuppliers && cachedProduct) {
    //   // Use cached data if available
    //   setSuppliers(JSON.parse(cachedSuppliers));
    //   setProducts(JSON.parse(cachedProduct));
    //   // setLoading(false);
    // } else {

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('/api/get-supplier', { withCredentials: true });
        console.log(response.data?.suppliers, response.data?.product)
        setSuppliers(response.data?.suppliers); // Set data or fallback to an empty array
        const inventoryProducts = await getInventoryProducts()
        setProducts(inventoryProducts);
        // setProducts(response.data?.product);
        localStorage.setItem('suppliers', JSON.stringify(response.data?.suppliers));
        localStorage.setItem('product', JSON.stringify(response.data?.product));
      } catch (error) {
        console.error('Error fetching suppliers', error);
      }
    };
    fetchSuppliers();
  // }
  }, []);

  // Filter suppliers based on search query
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(search.toLowerCase())
  );

  var rows = [];

  filteredSuppliers.map((supplier) => {
      rows.push(
          {
            Name: supplier.name,
            Email: <p className=' max-xlg:w-full'>{supplier.contactInfo?.email}</p>,
            // Address: supplier.contactInfo?.address,
            Contact: supplier.contactInfo?.phone,
            Product: products && products.map((item, index)=>{return  item._id===supplier.products[0] && 
                                              (<ul className='flex flex-col gap-2 justify-end items-center max-xlg:items-end'
                                            key={item._id}>
                                              <li className='flex items-center justify-end'>Name - {item.name}</li>
                                              <li className='flex items-center justify-end'>Type - {item.type}</li>
                                              <li className='flex items-center justify-between'>Price - {item.price}</li>
                                              <li className='flex items-center justify-between'>Quantity - {item.quantity}</li>
                                              </ul>)})
          },
      )
  });

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4 max-xlg:flex-wrap">
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
        <TableLayout headers={headers} rows={rows}/>
        {/* <table className="min-w-full text-left table-auto">
          <thead>
            <tr className="text-gray-700">
              <th className="px-6 py-3">Name</th>
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
        </table> */}

        {/* Show message if no suppliers match the search */}
        {filteredSuppliers.length === 0 && (
          <p className="text-gray-500 mt-4">No suppliers found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default SuppliersList;

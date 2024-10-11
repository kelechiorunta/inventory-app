// components/ProductList.js
'use client'
// components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Include the CSS for skeleton animations
import Pagination from './Pagination';
import TableLayout from './TableLayout';

const headers = [
  { key: 'Name', label: 'Name', scope: 'col' },
  { key: 'Code', label: 'Code', scope: 'col' },
  { key: 'Price', label: 'Price', scope: 'col' },
  { key: 'Quantity', label: 'Quantity', scope: 'col' },
  { key: 'Plan', label: 'Plan', scope: 'col' },
  { key: 'Transaction', label: 'Transaction', scope: 'col' },
  { key: 'Reciept', label: 'Reciept', scope: 'col' },
];

const SalesOrderList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true); // Loading state to track data fetch
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const productsPerPage = 15; // Number of products per page

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/get-salesorder');
        setProducts(data.salesorders);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching products', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
var rows = [];

  filteredProducts.map((product) => {
    
      rows.push(
          {
            Name: product.name,
            Code: product.code,
            Price: product.price,
            Quantity: product.quantity,
            Plan: product.plan,
            Transaction: product.paymentStatus,
            Reciept: <div className='mx-auto flex items-center justify-end'>
                        <img src={product.reciept} alt={product.name} width="50" />
                      </div>,
          },
      )
  })

  // Get current products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);


  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '10px', marginBottom: '20px', width: '300px' }}
      />

         <TableLayout headers={headers} rows={rows} loading={loading}/>

      {/* /* <table className='rounded-md shadow-md' border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Type</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Plan</th>
            <th>Transaction</th>
            <th>Reciept</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            // Show skeleton rows when loading
            Array(3)
              .fill('')
              .map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton width={150} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                  <td>
                    <Skeleton width={50} />
                  </td>
                  <td>
                    <Skeleton width={50} />
                  </td>
                  <td>
                    <Skeleton width={50} height={50} />
                  </td>
                </tr>
              ))
          ) : 
           
          (
            filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.code}</td>
                <td>{product.type}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.plan}</td>
                <td>{product.paymentStatus}</td>
                <td className='mx-auto flex items-center justify-center'>
                  <img src={product.reciept} alt={product.name} width="50" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table> */}

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalProducts={filteredProducts.length}
        productsPerPage={productsPerPage}
        paginate={(pageNumber) => setCurrentPage(pageNumber)}
      />
    </div>
  );
};

export default SalesOrderList;

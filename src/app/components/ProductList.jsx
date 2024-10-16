// // components/ProductList.js
// 'use client'
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     // Fetch products from API
//     const fetchProducts = async () => {
//       try {
//         const { data } = await axios.get('/api/get-products', {withCredentials:true});
//         console.log(data)
//         setProducts(data.products);
//       } catch (error) {
//         console.error('Error fetching products', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         style={{ padding: '10px', marginBottom: '20px', width: '300px' }}
//       />

//       <table border="1" width="100%">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Code</th>
//             <th>Type</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Image</th>
//           </tr>
//         </thead>
//         <tbody className='shadow-2xl rounded-md'>
//           {filteredProducts.map((product) => (
//             <tr key={product._id}>
//               <td>{product.name}</td>
//               <td>{product.code}</td>
//               <td>{product.type}</td>
//               <td>${product.price}</td>
//               <td>{product.quantity}</td>
//               <td className='mx-auto flex items-center justify-center'>
//                 <img src={product.image} alt={product.name} width="50" />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductList;

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
  { key: 'Type', label: 'Type', scope: 'col' },
  { key: 'Price', label: 'Price', scope: 'col' },
  { key: 'Quantity', label: 'Quantity', scope: 'col' },
  { key: 'Image', label: 'Image', scope: 'col' },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true); // Loading state to track data fetch
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const productsPerPage = 15; // Number of products per page

  useEffect(() => {
    const cachedProducts = localStorage.getItem('products');

    if (cachedProducts) {
      // Use cached data if available
      setProducts(JSON.parse(cachedProducts));
      setLoading(false);
    } else {
      // Fetch data from API if not cached
      const fetchProducts = async () => {
        try {
          const { data } = await axios.get('/api/get-products');
          setProducts(data.products);
          localStorage.setItem('products', JSON.stringify(data.products)); // Cache the data
          setLoading(false);
        } catch (error) {
          console.error('Error fetching products', error);
          setLoading(false);
        }
      };

      fetchProducts();
    }
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
            Type: product.type,
            Price: product.price,
            Quantity: product.quantity,
            Image: <div className='mx-auto flex items-center justify-center max-xlg:justify-end'>
                        <img src={product.image} alt={product.name} width="50" />
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
        aria-labelledby='my-input'
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '10px', marginBottom: '20px', width: '300px' }}
      />

      {/* <p hidden id='my-input'>Please enter the Product</p> */}
      

      <TableLayout headers={headers} rows={rows} loading={loading}/>

      {/* <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Type</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
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
          ) : (
            filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.code}</td>
                <td>{product.type}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td className='mx-auto flex items-center justify-center'>
                  <img src={product.image} alt={product.name} width="50" />
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

export default ProductList;


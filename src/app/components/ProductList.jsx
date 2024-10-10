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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true); // Loading state to track data fetch

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/get-products');
        setProducts(data.products);
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

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '10px', marginBottom: '20px', width: '300px' }}
      />

      <table border="1" width="100%">
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
      </table>
    </div>
  );
};

export default ProductList;


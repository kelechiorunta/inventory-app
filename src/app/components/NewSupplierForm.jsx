// 'use client'
// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBox } from 'react-icons/fa'; // Import necessary icons

// const NewSupplierForm = () => {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [address, setAddress] = useState('');
//   const [products, setProducts] = useState([]); // assuming products will be a list of product IDs
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send form data to the backend API
//       const res = await axios.post('/api/create-supplier', {
//         name,
//         phone,
//         email,
//         address,
//         products, // Assuming you have logic to set product IDs
//       });

//       if (res.data.success) {
//         setSuccessMessage('Supplier created successfully!');
//         setName('');
//         setPhone('');
//         setEmail('');
//         setAddress('');
//         setProducts([]);
//       }
//     } catch (error) {
//       setError('Failed to create supplier. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create New Supplier</h2>
      
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      
//       <form 
//       className='max-w-full container w-full'
//       onSubmit={handleSubmit}>
//         {/* Supplier Name */}
//         <div className="mb-4 w-full">
//           <label htmlFor="name" className="flex items-center text-gray-700 mb-2">
//             <FaUser className="mr-2" /> Supplier Name
//           </label>
//           <input
//             id="name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter supplier name"
//             required
//           />
//         </div>

//         {/* Phone */}
//         <div className="mb-4 w-full">
//           <label htmlFor="phone" className="flex items-center text-gray-700 mb-2">
//             <FaPhone className="mr-2" /> Phone
//           </label>
//           <input
//             id="phone"
//             type="text"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter phone number"
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-4 w-full">
//           <label htmlFor="email" className="flex items-center text-gray-700 mb-2">
//             <FaEnvelope className="mr-2" /> Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter email address"
//           />
//         </div>

//         {/* Address */}
//         <div className="mb-4 w-full">
//           <label htmlFor="address" className="flex items-center text-gray-700 mb-2">
//             <FaMapMarkerAlt className="mr-2" /> Address
//           </label>
//           <input
//             id="address"
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter address"
//           />
//         </div>

//         {/* Products */}
//         <div className="mb-4 w-full">
//           <label htmlFor="products" className="flex items-center text-gray-700 mb-2">
//             <FaBox className="mr-2" /> Products (IDs)
//           </label>
//           <input
//             id="products"
//             type="text"
//             value={products.join(', ')} // Display product IDs as comma-separated values
//             onChange={(e) => setProducts(e.target.value.split(',').map((id) => id.trim()))}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter product IDs separated by commas"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Create Supplier
//         </button>
//       </form>
//     </div>
//   );
// };

// export default NewSupplierForm;

'use client'; // Ensure client-side rendering for Next.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBox } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import { BsCheckCircle } from 'react-icons/bs';

// Utility function to check if a string is a valid MongoDB ObjectID
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const NewSupplierForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]); // List of selected product IDs
  const [availableProducts, setAvailableProducts] = useState([]); // Available Inventory Products
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch Inventory Products on load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/get-products'); // Endpoint to fetch inventory products
        setAvailableProducts(res.data.products); // Assume API returns an array of products
      } catch (err) {
        setError('Failed to fetch products. Please try again.');
      }
    };

    fetchProducts();
  }, []);

  // Form validation
  const validateForm = () => {
    const errors = {};

    // Validate supplier name
    if (!name.trim()) {
      errors.name = 'Supplier name is required.';
    }

    // Validate email
    if (!email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format.';
    }

    // Validate product selection
    if (selectedProducts.length === 0) {
      errors.products = 'You must select at least one product.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      // Submit data to the create-supplier API
      const entries =  {
        name,
        contactInfo: {
          phone,
          email,
          address,
        },
        products: selectedProducts, // Array of selected product ObjectIds
      }
      const res = await axios.post('/api/create-supplier', entries, {withCredentials:true});

      console.log(entries)

    //   if (res?.data?.message) {
        setSuccessMessage('Supplier created successfully!');
        // Clear the form
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setSelectedProducts([]);
        setValidationErrors({});

        localStorage.clear()
    //   }
    } catch (error) {
      setError('Failed to create supplier. Please try again.');
    }
  };

  // Handle product selection
  const handleProductSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setSelectedProducts(selectedOptions);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 lg:mt-16">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New Supplier</h2>

      {error && (
        <p className="text-red-500 mb-4 flex items-center">
          <MdErrorOutline className="mr-2" />
          {error}
        </p>
      )}
      {successMessage && (
        <p className="text-green-500 mb-4 flex items-center">
          <BsCheckCircle className="mr-2" />
          {successMessage}
        </p>
      )}

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {/* Supplier Name */}
        <div className="col-span-1">
          <label htmlFor="name" className="flex items-center text-gray-700 mb-2">
            <FaUser className="mr-2 text-xl" />
            Supplier Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${validationErrors.name && 'border-red-500'}`}
            placeholder="Enter supplier name"
            required
          />
          {validationErrors.name && <p className="text-red-500 text-sm mt-2">{validationErrors.name}</p>}
        </div>

        {/* Phone */}
        <div className="col-span-1">
          <label htmlFor="phone" className="flex items-center text-gray-700 mb-2">
            <FaPhone className="mr-2 text-xl" />
            Phone
          </label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
          />
        </div>

        {/* Email */}
        <div className="col-span-1">
          <label htmlFor="email" className="flex items-center text-gray-700 mb-2">
            <FaEnvelope className="mr-2 text-xl" />
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${validationErrors.email && 'border-red-500'}`}
            placeholder="Enter email address"
            required
          />
          {validationErrors.email && <p className="text-red-500 text-sm mt-2">{validationErrors.email}</p>}
        </div>

        {/* Address */}
        <div className="col-span-1">
          <label htmlFor="address" className="flex items-center text-gray-700 mb-2">
            <FaMapMarkerAlt className="mr-2 text-xl" />
            Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address"
          />
        </div>

        {/* Products (Multi-select) */}
        <div className="col-span-2">
          <label htmlFor="products" className="flex items-center text-gray-700 mb-2">
            <FaBox className="mr-2 text-xl" />
            Select Products
          </label>
          <select
            id="products"
            multiple
            value={selectedProducts}
            onChange={handleProductSelection}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
          >
            {availableProducts.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} (Code: {product.code})
              </option>
            ))}
          </select>
          {validationErrors.products && <p className="text-red-500 text-sm mt-2">{validationErrors.products}</p>}
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Supplier
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewSupplierForm;


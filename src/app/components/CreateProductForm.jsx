'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { FiCamera } from 'react-icons/fi'; // React Icon for camera/upload

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: '',
    price: '',
    quantity: '',
  });
  const [imageBase64, setImageBase64] = useState(''); // Image Base64 string
  const [uploading, setUploading] = useState(false); // For handling upload status

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageBase64) {
      alert('Please upload an image!');
      return;
    }

    setUploading(true);

    try {
      // Prepare the product data with the Base64 image string
      const newProduct = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        image: imageBase64, // Save the Base64 string in MongoDB
      };

      // Post to API to save product to MongoDB
      await axios.post('/api/create-product', newProduct, { withCredentials: true });
      alert('Product created successfully');
      setUploading(false);
      setFormData({
        name: '',
        code: '',
        type: '',
        price: '',
        quantity: '',
      });
      setImageBase64('');
    } catch (error) {
      console.error('Error creating product:', error);
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Create New Product</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name Field */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Code Field */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Product Code</label>
          <input
            type="text"
            name="code"
            placeholder="Enter product code"
            value={formData.code}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Type Field */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Product Type</label>
          <input
            type="text"
            name="type"
            placeholder="Enter product type"
            value={formData.type}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Price Field */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Product Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter product price"
            value={formData.price}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Quantity Field */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col items-start">
          <label className="text-gray-700 font-medium mb-2">Product Image</label>
          <label className="flex items-center justify-center border border-gray-300 rounded-md p-3 cursor-pointer hover:bg-gray-100">
            <FiCamera className="text-blue-500 mr-2" size={20} />
            <span>Upload Image</span>
            <input
              type="file"
              name="image"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>
          {imageBase64 && (
            <img src={imageBase64} alt="Product Preview" className="mt-4 w-32 h-32 object-cover rounded-md" />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className={`mt-4 px-4 py-2 text-white font-medium rounded-md focus:outline-none ${
            uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {uploading ? 'Uploading...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;


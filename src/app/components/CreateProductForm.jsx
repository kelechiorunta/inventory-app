// components/CreateProductForm.js
'use client'
import React, { useState } from 'react';
import axios from 'axios';

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
      await axios.post('/api/create-product', newProduct, {withCredentials:true});
      alert('Product created successfully');
      setUploading(false);
    } catch (error) {
      console.error('Error creating product:', error);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="code"
        placeholder="Code"
        value={formData.code}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={formData.type}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleImageChange}
        required
      />
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Create Product'}
      </button>
    </form>
  );
};

export default CreateProductForm;

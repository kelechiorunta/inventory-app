import React, { useState } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa'; // Loading Spinner Icon

const SalesOrderForm = ({ ListProducts }) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Filter products based on search input
  const product = ListProducts && ListProducts.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sales order state
  const [salesOrder, setSalesOrder] = useState({
    name: '',
    code: '',
    type: '',
    price: '',
    quantity: '',
    reciept: '',
    plan: 'Direct-sales', // Default value
    paymentStatus: 'Pending' // Default value
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalesOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  // Handle receipt image upload and convert to base64
  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSalesOrder((prevOrder) => ({
        ...prevOrder,
        reciept: reader.result, // Store base64 string of the image
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Submit sales order
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, code, type, price, quantity, reciept, plan, paymentStatus } = salesOrder;

    let entries;
    if (product) {
      entries = { 
        name: name || product[0]?.name, 
        code: code || product[0]?.code, 
        type: type || product[0]?.type, 
        price: price || product[0]?.price, 
        quantity, reciept, plan, paymentStatus 
      };
    }

    try {
      // API call to save sales order
      const response = await axios.post('/api/save-salesorder', entries, { withCredentials: true });
      console.log('Sales Order saved:', response.data);
      alert('Sales Order saved successfully');
      localStorage.clear();
    } catch (error) {
      console.error('Error saving sales order', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Sales Order</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Product Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={salesOrder.name || (product && product[0]?.name)}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Product Code */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Product Code</label>
          <input
            type="text"
            name="code"
            value={salesOrder.code || (product && product[0]?.code)}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Product Type */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Product Type</label>
          <input
            type="text"
            name="type"
            value={salesOrder.type || (product && product[0]?.type)}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Product Price */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Product Price</label>
          <input
            type="number"
            name="price"
            value={salesOrder.price || (product && product[0]?.price)}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Quantity */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={salesOrder.quantity}
            onChange={handleChange}
            min="1"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Receipt Upload */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Receipt (Upload Image)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleReceiptUpload}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {salesOrder.reciept && (
            <img
              src={salesOrder.reciept}
              alt="Receipt Preview"
              className="mt-4 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>

        {/* Sales Plan */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Sales Plan</label>
          <select
            name="plan"
            value={salesOrder.plan}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Direct-sales">Direct Sales</option>
            <option value="Retail">Retail</option>
            <option value="Wholesale">Wholesale</option>
          </select>
        </div>

        {/* Payment Status */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Payment Status</label>
          <select
            name="paymentStatus"
            value={salesOrder.paymentStatus}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`flex items-center justify-center px-4 py-2 text-white font-medium rounded-md focus:outline-none ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={loading}
        >
          {loading ? (
            <FaSpinner className="animate-spin mr-2" size={20} />
          ) : (
            'Save Sales Order'
          )}
        </button>
      </form>
    </div>
  );
};

export default SalesOrderForm;


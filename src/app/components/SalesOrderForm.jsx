import React, { useState } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

const SalesOrderForm = ({ ListProducts }) => {

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false)

  const product = ListProducts && ListProducts.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Product is passed as a prop to pre-fill the form
  const [salesOrder, setSalesOrder] = useState({
    name: product && product[0]?.name || '',
    code: product && product[0]?.code || '',
    type: product && product[0]?.type || '',
    price: product && product[0]?.price || 0,
    quantity: product && product[0]?.quantity || 1,
    reciept: '', // Base64 image string
    plan: 'Direct-sales', // Default value for plan
    paymentStatus: 'Pending'
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
    setLoading(true)
    const { name, code, type, price, quantity, reciept, plan, paymentStatus } = salesOrder
    // if (name && code && type && price && quantity && reciept && plan) are truthy
    var entries;
    if (product){
      entries = { name: product[0]?.name, code:product[0]?.code, type:product[0]?.type, price:product[0]?.price, quantity, reciept, plan, paymentStatus }
    }
      
      console.log(entries)
    
    try {
      // API call to save sales order
      const response = await axios.post('/api/save-salesorder', entries, { withCredentials: true });
      console.log('Sales Order saved:', response.data);
    } catch (error) {
      console.error('Error saving sales order', error);
    }finally{
      setLoading(false)
    }
  };

  return (
      <div className='container max-w-full flex flex-col gap-y-4'>
        <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {setSearch(e.target.value); console.log(product)}}
            style={{ padding: '10px', marginBottom: '20px', width: '300px' }}
          />

        <form 
        className='p-4 flex flex-col gap-y-4 bg-gradient-to-l from-slate-100 via-slate-100 to-slate-200 rounded-md shadow-md'
        onSubmit={handleSubmit} 
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
          <h3>Create Sales Order</h3>

          <div className='flex gap-x-4 w-max items-center justify-between'>
            <label className='w-full flex items-center gap-6'>
              Product Name:
              <input type="text" name="name" onChange={handleChange} value={salesOrder.name || product && product[0]?.name}  />
            </label>
          </div>

          <div className='flex gap-x-6 w-full items-center justify-between'>
            <label className='w-full flex items-center gap-7'>
              Product Code:
              <input type="text" name="code" onChange={handleChange} value={salesOrder.code || product && product[0]?.code} />
            </label>
          </div>

          <div className='flex gap-x-6 w-full items-center justify-between'>
            <label className='w-full flex items-center gap-7'>
              Product Type:
              <input type="text" name="type" onChange={handleChange} value={salesOrder.type || product && product[0]?.type}  />
            </label>
          </div>

          <div className='flex gap-x-6 w-full items-center justify-between'>
            <label className='w-full flex items-center gap-7'>
              Product Price:
              <input type="number" name="price" onChange={handleChange} value={salesOrder.price || product && product[0]?.price} />
            </label>
          </div>

          <div className='flex gap-x-6 w-full items-center justify-between'>
            <label className='w-full flex items-center gap-16'>
              Quantity:
              <input
                type="number"
                name="quantity"
                value={salesOrder.quantity}
                onChange={handleChange}
                min="1"
                required
              />
            </label>
          </div>

          <div className='flex gap-x-6 w-full items-center justify-between'>
            <label className='w-full flex items-center gap-6'>
              Receipt (Upload Image):
              <input type="file" accept="image/*" onChange={handleReceiptUpload} />
              {salesOrder.reciept && <img src={salesOrder.reciept} alt="Receipt Preview" width="100" />}
            </label>
          </div>

          <div className='flex gap-x-6 w-full items-center justify-between'>
            <label className='w-full flex items-center gap-16'>
              Sales Plan:
              <select name="plan" value={salesOrder.plan} onChange={handleChange}>
                <option value="Direct-sales">Direct Sales</option>
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
              </select>
            </label>
          </div>

          <div className='flex gap-x-6 w-full items-center justify-between'>
            <label className='w-full flex items-center gap-9'>
              Payment Status:
              <select name="paymentStatus" value={salesOrder.paymentStatus} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </label>
          </div>

          <button 
            className='rounded-md shadow-md'
            type="submit" 
            style={{ marginTop: '20px', padding: '10px', background: 'blue', color: 'white' }}>
            {loading? <FaSpinner className='animate-spin m-auto' size={20} /> : 'Save Sales Order'}
          </button>
        </form>
      </div>
  );
};

export default SalesOrderForm;

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: String,
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantityInStock: {
      type: Number,
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId, // Reference to supplier
      ref: 'Supplier',
    },
    sku: {
      type: String, // Stock Keeping Unit for unique identification
      required: true,
      unique: true,
    },
    reorderLevel: {
      type: Number, // Threshold to reorder
      default: 10,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Product = mongoose.model('Product', ProductSchema);

  export default Product
  
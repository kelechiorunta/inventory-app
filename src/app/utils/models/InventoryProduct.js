// models/Product.js
// models/Product.js
import mongoose from 'mongoose';

const InventoryProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String }, // Save Base64 string here
});

export default mongoose.models.InventoryProduct || mongoose.model('InventoryProduct', InventoryProductSchema);

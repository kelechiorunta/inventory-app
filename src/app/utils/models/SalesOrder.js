import mongoose from 'mongoose';

const SalesOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  reciept: { type: String }, // Save Image as Base64 string here
  plan: {
    type: String,
    enum: ['Direct-sales', 'Retail', 'Wholesale'],
    default: 'Direct-sales',
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  },
});

export default mongoose.models.SalesOrder || mongoose.model('SalesOrder', SalesOrderSchema);
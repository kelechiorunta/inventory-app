import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantitySold: {
      type: Number,
      required: true,
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
    totalSaleAmount: {
      type: Number,
      required: true,
    },
    saleDate: {
      type: Date,
      default: Date.now,
    },
    customer: {
      type: String,
      required: true,
    },
  });
  
  const Sale = mongoose.model('Sale', SalesSchema);

  export default Sale
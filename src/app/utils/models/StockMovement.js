import mongoose from "mongoose";

const StockMovementSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantityAdded: {
      type: Number,
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    restockDate: {
      type: Date,
      default: Date.now,
    },
    remarks: String,
  });
  
  const StockMovement = mongoose.model('StockMovement', StockMovementSchema);

  export default StockMovement
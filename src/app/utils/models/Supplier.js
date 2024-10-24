import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    contactInfo: {
      phone: String,
      email: String,
      address: String,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InventoryProduct',
      },
    ],
  });
  
  const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', SupplierSchema);

  export default Supplier
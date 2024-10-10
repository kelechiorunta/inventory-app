import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const sessionUserSchema = new Schema({
    user_email: { type: String, required: true}, // You can use the user's auth ID
    stocks: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to Stock documents
        ref: 'Stock'
      }
    ]
  });
  
  // Create the SessionUser model
  const SessionUser = mongoose.models.SessionUser || model('SessionUser', sessionUserSchema);

  export default SessionUser
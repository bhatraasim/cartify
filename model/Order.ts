import mongoose, { Schema, model, models } from "mongoose";
import { CartItem, CartItemSchema } from "./Cart";

interface PopulatedUser {
  _id: mongoose.Types.ObjectId;
  email: string;
}

interface PopulatedProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  imageUrl: string;
}

export interface IOrder {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | PopulatedUser;
  items: CartItem[];
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';  // ✅ Correct!
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [CartItemSchema],
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    amount: { type: Number, required: true },
    status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'], // These are YOUR allowed values
    default: 'pending'
  }
  },
  { timestamps: true }
);

const Order = models?.Order || model<IOrder>("Order", orderSchema);
export default Order;
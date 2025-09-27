import mongoose, { model, models, Schema, Types } from "mongoose";

export interface CartItem {
            productId: Types.ObjectId;
            quantity: number;
        }

export interface CartType {
            userId: Types.ObjectId | string;
            items: CartItem[];
            // Add other Cart model properties if needed
}

const CartItemSchema = new Schema({
    productId : { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity : { type: Number, required: true, min: 1 },
})

const  CartSchema = new Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items : [CartItemSchema]
},{
    timestamps:true
})


const Cart = models?.Cart ||  model("Cart" , CartSchema);

export default Cart ;
// 

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Cart from "@/model/Cart";
import Order from "@/model/Order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// In /api/payment/verify/route.ts
export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return NextResponse.json({ 
                success: false, 
                message: "Unauthorized" 
            }, { status: 401 });
        }

        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        // Verify signature (important for security!)
        const crypto = require('crypto');
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            // Update order status to "paid"
            await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { 
                    status: 'paid',
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature
                }
            );

            // Clear the user's cart
            await Cart.findOneAndUpdate(
                { userId: session.user.id },
                { items: [] }
            );

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ 
                succes: false, 
                message: "Invalid signature" 
            }, { status: 400 });
        }

    } catch (error) {
        console.error("Error in payment verification:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Payment verification failed" 
        }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/db";
import Order from "@/model/Order";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

      const event = JSON.parse(body);

    if (signature !== expectedSignature) {
      await Order.findOneAndUpdate(
        { razorpayOrderId: event.payload.payment.entity.order_id },
        { status: "failed" }
      );
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }

    

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        {
          razorpayPaymentId: payment.id,
          status: "completed",
        }
      )
        .populate({
          path: "items.productId",
          select: "name imageUrl ",
          options: { strictPopulate: false },
        })
        .lean();
    }
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Error in /api/webhooks/razorpay:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error (Razorpay)" },
      { status: 500 }
    );
  }
}

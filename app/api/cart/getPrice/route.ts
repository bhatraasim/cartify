// app/api/cart/price/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Cart from "@/model/Cart";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ success: false, message: "User not authenticated" });
    }

    const cart = await Cart.findOne({ userId: session.user.id })
      .select("items.quantity items.productId")
      .populate({ path: "items.productId", select: "price" });

    if (!cart) {
      return Response.json({ success: false, message: "Cart not found" });
    }

    let total = 0;
    for (const item of cart.items) {
      total += Number(item?.productId?.price) * Number(item?.quantity);
    }

    return NextResponse.json({ success: true, totalPrice: total });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: error });
  }
}

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Cart from "@/model/Cart";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


interface PopulatedCartItem {
  _id?: string;
  productId: {
    _id: string;
    title: string;
    price: number;
    url: string;
    desc: string;
  };
  quantity: number;
}

interface PopulatedCartType {
  _id: string;
  userId: string | Types.ObjectId;
  items: PopulatedCartItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({
        success: false,
        message: 'User not authenticated',
        cart: null,
      }, { status: 401 });
    }

    // Fetch cart with populated product fields
    const cart = (await Cart.findOne({ userId: session.user.id })
      .populate('items.productId', 'title price url desc')
      .lean()) as PopulatedCartType | null;

    return NextResponse.json({
      success: true,
      message: 'Cart fetched successfully',
      cart: cart || {
        items: [],
        userId: session.user.id,
        _id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error:unknown) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({
      success: false,
      message: 'Error fetching cart data',
      cart: null,
    }, { status: 500 });
  }
}

"use server";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Cart, { CartItem, CartType } from "@/model/Cart";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";


export const dynamic = 'force-dynamic';


export default async function addToCart(
  productId: Types.ObjectId,
  quantity: number
) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const userId = session.user.id;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem: CartItem | undefined = (cart as CartType).items.find(
      (item: CartItem) => item.productId.toString() === productId.toString()
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    return { success: true, message: "Item added to cart" };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message:
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "error occured while adding item to cart ",
    };
  }
}

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

// Define the populated cart type
interface PopulatedCartType {
  _id: string;
  userId: string | Types.ObjectId;
  items: PopulatedCartItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export async function getCartData() {
  try {
    try {
      await connectToDatabase();
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("MongoDB connection error", err);
    }
    const session = await getServerSession(authOptions);
    console.log("Session in production:", session);
    if (!session?.user?.id) {
      return { success: false, message: "User not authenticated", cart: null };
    }

    if (!session?.user?.id) {
      return {
        success: false,
        message: "User not authenticated",
        cart: null,
      };
    }


    // Fetch raw cart without populate
    const rawCart = await Cart.findOne({ userId: session.user.id }).lean();
    console.log('Raw cart before populate:', rawCart);

    // Cast to PopulatedCartType after populate and lean
    const cart = (await Cart.findOne({ userId: session.user.id })
      .populate("items.productId", "title price url desc")
      .lean()) as PopulatedCartType | null;

    console.log("Fetched cart with pipulate :", cart);

    return {
      success: true,
      message: "Cart fetched successfully",
      cart: cart || {
        items: [],
        userId: session.user.id,
        _id: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: "Error fetching cart data",
      cart: null,
    };
  }
}

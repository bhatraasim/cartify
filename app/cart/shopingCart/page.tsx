'use client';
import CartCard from "@/components/ui/CartCard";
import Loader from "@/components/ui/Loader";
import { Types } from "mongoose";
import { useEffect, useState } from "react";

type CartType = {
  items: {
    _id?: Types.ObjectId;
    productId: {
      _id: Types.ObjectId;
      title: string;
      price: number;
      url: string;
      desc: string;
    };
    quantity: number;
  }[];
  userId: string;
};

export default function CartPage() {
  const [cartData, setCartData] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch("/api/getCartItems");
        const result = await res.json();
        if (!result.success) {
          setError(result.message);
        } else {
          setCartData(result.cart);
        }
      } catch (err) {
        setError("Error loading cart data");
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl text-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl text-center">
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl text-center">
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        <p className="text-gray-500 text-lg">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Your Shopping Cart
      </h1>
      <p className="mb-4 text-center sm:text-left">Found {cartData.items.length} items</p>
      <CartCard initialCartData ={cartData} />
    </div>
  );
}

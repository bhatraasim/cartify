'use client';



// import { getCartData } from '@/app/actions/cart';
// import CartCard  from '@/components/ui/CartCard';

import CartCard from "@/components/ui/CartCard";
import { useEffect, useState } from "react";




// const dynamic = "force-dynamic";

// export default async function CartPage() {
  
//   try {
//     const result = await getCartData();
    
//     if (!result.success) {
//       return (
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
//           <p className="text-red-500">{result.message}</p>
//         </div>
//       );
//     }

//     return (
//       <div className="container mx-auto px-4 py-8">
        
//         {result.cart && result.cart.items && result.cart.items.length > 0 ? (
//           <div>
//             <p>Found {result.cart.items.length} items</p>
//              <CartCard
//         initialCartData={JSON.parse(JSON.stringify(result.cart))} 
//       />
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">Your cart is empty</p>
//           </div>
//         )}
//       </div>
//     );
//   } catch (error) {




// Define the correct cart type expected by CartCard
type CartType = {
  items: {
    _id?: string;
    productId: {
      _id: string;
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
        const res = await fetch('/api/getCartItems');
        const result = await res.json();
        if (!result.success) {
          setError(result.message);
        } else {
          setCartData(result.cart);
        }
      } catch (err) {
        setError('Error loading cart data ui');
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading cart...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        <p className="text-gray-500 text-lg">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <p className="mb-4">Found {cartData.items.length} items</p>
      <CartCard initialCartData={cartData} />
    </div>
  );
}

'use client'

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export interface CartDisplayProps {
  [x: string]: any;
  initialCartData: {
    items: Array<{
      _id?: string;
      productId: {
        _id: string;
        title: string;
        price: number;
        url: string;
        desc: string;
      };
      quantity: number;
    }>;
    userId: string;
  };
}

export default function CartCard({ initialCartData }: CartDisplayProps) {
  const [cartItems, setCartItems] = useState(initialCartData.items);
  const [isPending, startTransition] = useTransition();

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => 
        item.productId._id !== productId
      ));
    } else {
      setCartItems(cartItems.map(item => 
        item.productId._id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }

    startTransition(async () => {
      console.log(`Update quantity for ${productId} to ${newQuantity}`);
      // TODO: Add server action for updating cart in database
    });
  };

  const total = cartItems.reduce((sum, item) => 
    sum + (item.productId.price * item.quantity), 0
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-8 flex gap-10">
      <div className="space-y-6">
        {cartItems.map((item, index) => (
          <div 
            key={item._id || index} 
            className="flex items-center justify-between p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center space-x-6 flex-grow">
              <img 
                src={item.productId.url} 
                alt={item.productId.title}
                className="w-24 h-24 object-contain rounded-lg border border-gray-100"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900">{item.productId.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{item.productId.desc}</p>
                <p className="text-xl font-bold text-gray-900 mt-2">${item.productId.price}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 ml-4">
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button
                  onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                  disabled={isPending}
                  className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 min-w-[50px] text-center bg-white font-medium text-gray-900">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                  disabled={isPending}
                  className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => updateQuantity(item.productId._id, 0)}
                disabled={isPending}
                className="text-gray-400 hover:text-red-500 disabled:opacity-50 transition-colors"
                title="Remove Item"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 011 1v5a1 1 0 11-2 0V9a1 1 0 011-1z" clipRule="evenodd"></path></svg>
              </button>
            </div>
          </div>
        ))}
      </div>


      <div className="bg-white p-6 rounded-xl shadow-md h-full">
        <div className="flex justify-between items-center text-xl font-semibold border-b pb-4 mb-4">
          <span>Subtotal:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">Shipping and taxes calculated at checkout.</p>
          <Link href="/cart/shippingAdress">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all w-full md:w-auto">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>


    </div>
  );
}
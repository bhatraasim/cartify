'use client'

import React, { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Types } from 'mongoose'
import { deleteItemFromCart } from '@/app/actions/cart'

export interface CartDisplayProps {
  initialCartData: {
    items: Array<{
      _id?: Types.ObjectId
      productId: {
        _id: Types.ObjectId
        title: string
        price: number
        url: string
        desc: string
      }
      quantity: number
    }>
    userId: string
  }
}

export default function CartCard({ initialCartData }: CartDisplayProps) {
  const [cartItems, setCartItems] = useState(initialCartData.items)
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(false)

  const updateQuantity = (productId: Types.ObjectId, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter((item) => item.productId._id !== productId))
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.productId._id === productId ? { ...item, quantity: newQuantity } : item
        )
      )
    }

    startTransition(async () => {
      console.log(`Update quantity for ${productId} to ${newQuantity}`)
      // TODO: Add server action for updating cart
    })
  }

  const removeItem = async (productId: Types.ObjectId) => {
    setLoading(true)
    const result = await deleteItemFromCart(productId)
    if (result.success) {
      setCartItems(cartItems.filter((item) => item.productId._id !== productId))
    } else {
      console.error(result.message)
    }
    setLoading(false)
  }

  const total = cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0)

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto py-10 px-4">
      {/* LEFT SIDE - CART ITEMS */}
      <div className="flex-1 space-y-6">
        {cartItems.map((item, index) => (
          <div
            key={item._id?.toString() || index}
            className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-5 border border-gray-100"
          >
            {/* PRODUCT IMAGE */}
            <img
              src={item.productId.url}
              alt={item.productId.title}
              className="w-24 h-24 object-contain rounded-lg border border-gray-100 flex-shrink-0"
            />

            {/* PRODUCT INFO */}
            <div className="flex flex-col sm:flex-row justify-between flex-1 sm:ml-6 w-full sm:w-auto">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate sm:whitespace-normal break-words">
                  {item.productId.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 sm:line-clamp-3 mt-1">
                  {item.productId.desc}
                </p>
                <p className="text-xl font-bold text-gray-900 mt-2">
                  ₹{item.productId.price.toFixed(2)}
                </p>
              </div>

              {/* QUANTITY + REMOVE BUTTONS */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-end mt-4 sm:mt-0 gap-3">
                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                    disabled={isPending}
                    className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-[40px] text-center bg-white font-medium text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                    disabled={isPending}
                    className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.productId._id)}
                  disabled={isPending || loading}
                  className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                  title="Remove Item"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 011 1v5a1 1 0 11-2 0V9a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE - ORDER SUMMARY */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full lg:w-80 h-fit border border-gray-100 sticky top-24 self-start">
        <div className="flex justify-between items-center text-lg font-semibold border-b pb-3 mb-4">
          <span>Subtotal</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          Shipping and taxes calculated at checkout.
        </p>

        <Link href="/cart/shippingAdress">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 w-full rounded-full shadow-lg hover:shadow-xl transition-all">
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  )
}

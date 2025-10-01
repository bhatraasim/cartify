'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function FakePayPalPaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    // Fake loading simulation
    setTimeout(() => {
      setLoading(false);
      alert('This is a demo - no actual payment processed!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-2xl font-bold mr-4">
              PayPal
            </div>
            <div className="text-yellow-400 text-2xl">•••</div>
            <div className="bg-yellow-400 text-black px-6 py-3 rounded-lg text-xl font-semibold ml-4">
              Cartify
            </div>
          </div>
          <p className="text-gray-600">Complete your secure payment</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Payment Method Selection */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose payment method</h2>
                
                <div className="space-y-4">
                  {/* PayPal Option */}
                  <div 
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      paymentMethod === 'paypal' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-6 h-6 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                          {paymentMethod === 'paypal' && <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>}
                        </div>
                        <div className="bg-blue-600 text-white px-4 py-2 rounded font-bold text-lg">
                          PayPal
                        </div>
                        <span className="text-gray-600">Pay with your PayPal account</span>
                      </div>
                      <div className="text-yellow-600">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Credit Card Option */}
                  <div 
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-6 h-6 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                          {paymentMethod === 'card' && <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>}
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                          <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                        </div>
                        <span className="text-gray-600">Credit or Debit Card</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PayPal Login Section */}
              {paymentMethod === 'paypal' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded font-bold text-xl mr-4">PayPal</div>
                      <div className="text-sm text-blue-700">
                        <p>Log in to your PayPal account to complete this payment.</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email or mobile number</label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                          type="password"
                          placeholder="Enter your password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Details Section */}
              {paymentMethod === 'card' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Security Code</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <div className="text-yellow-600 mr-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-yellow-800">Your payment information is encrypted and secure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold">📦</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sample Product</p>
                    <p className="text-sm text-gray-600">Quantity: 1</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>$99.99</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>$9.99</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>$8.00</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>$117.98</span>
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <Button
                onClick={handlePayment}
                disabled={loading}
                className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 text-lg rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>Pay $117.98</>
                )}
              </Button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  By continuing, you agree to PayPal&apos;s terms and privacy policy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">🔒 This is a demo payment page - No real transactions will be processed</p>
          <div className="flex justify-center space-x-6 text-xs text-gray-400">
            <span>Privacy</span>
            <span>Legal</span>
            <span>User Agreement</span>
          </div>
        </div>
      </div>
    </div>
  );
}

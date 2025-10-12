'use client';

import React, { useEffect, useState } from 'react';
import RazorpayPayButton from '@/components/ui/RazorpayPayButton';
import MotionLoader from '@/components/ui/Loader';

export default function PaymentPage() {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true )
        const res = await fetch('/api/cart/getPrice', { method: 'GET' });
        const data = await res.json();
        if (data.success) {
          setPrice(data.totalPrice);
          setLoading(false)
        } else {
          console.error('Failed to fetch price:', data.message);
        }
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    }
    fetchPrice();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50/30 to-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Accent */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Secure Payment
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Complete your purchase using Razorpay
          </p>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Left: Payment Details */}
            <div className="md:col-span-3 p-10 space-y-8">
              {/* Total Amount Section */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-2xl p-8 border border-yellow-200/50">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Total Amount
                    </p>
                    <span className="text-5xl font-black text-gray-900 tracking-tight">
                      {loading ? <MotionLoader /> : price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </span>
                  </div>
                  <div className="bg-yellow-400 text-black rounded-xl px-4 py-2 font-bold text-sm shadow-lg shadow-yellow-400/30">
                    INR
                  </div>
                </div>
              </div>

              {/* Razorpay Button */}
              <div className="space-y-4">
                <RazorpayPayButton />
              </div>

              {/* Security Note */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-green-900 mb-1">
                    Secure & Encrypted
                  </h4>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Payments are secured and encrypted by Razorpay with 256-bit SSL protection
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-200">
                <div className="flex items-center text-xs font-semibold text-gray-500">
                  <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  SSL Secured
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center text-xs font-semibold text-gray-500">
                  <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  PCI DSS Compliant
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="text-xs font-semibold text-gray-500">
                  100% Safe
                </div>
              </div>
            </div>

            {/* Right: Branding / Info */}
            <div className="md:col-span-2 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 flex flex-col justify-between text-white relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/5 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="mb-6">
                  <div className="inline-block bg-neutral-200  px-6 py-2 rounded-lg text-2xl font-black mb-4 shadow-xl shadow-yellow-400/30">
                    <img 
                    src="/logo.png"
                    alt="Cartify Logo"
                    width={120}
                    height={40}
                    className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Fast & Reliable Payments
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Experience seamless, secure payments powered by India&apos;s leading payment gateway. Complete your purchase with confidence.
                </p>

                {/* Features */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Multiple Payment Options</p>
                      <p className="text-xs text-gray-400">UPI, Cards, Wallets & More</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Instant Confirmation</p>
                      <p className="text-xs text-gray-400">Real-time payment updates</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Bank-Grade Security</p>
                      <p className="text-xs text-gray-400">256-bit encryption</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-10 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-center space-x-3">
                  <img
                    src="https://razorpay.com/favicon.png"
                    alt="Razorpay"
                    className="w-8 h-8 opacity-90"
                  />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Powered by</p>
                    <p className="text-sm font-bold text-white">Razorpay</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Cartify. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

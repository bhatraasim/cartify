"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import Loader from "./Loader";
import { useSession } from "next-auth/react";

type RazorpayOptions = {
  key: string | undefined;
  order_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: IRazorpayInterface) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
};

interface RazorpayInstance {
  open(): void;
  on(event: "payment.failed", handler: (response: unknown) => void): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface IRazorpayInterface {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export default function RazorpayPayButton() {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const session = useSession()
  // Load Razorpay script
  useEffect(() => {

    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        // Check if script is already loaded
        if (window.Razorpay) {
          setScriptLoaded(true);
          resolve(true);
          return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          setScriptLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          console.error("Failed to load Razorpay script");
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    const fetchPrice = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/cart/getPrice', { method: 'GET' });
        const data = await res.json();
        if (data.success) {
          setLoading(false);
          setPrice(data.totalPrice);
        } else {
          console.error('Failed to fetch price:', data.message);
        }
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    }
    fetchPrice();

    loadRazorpayScript();
    fetchPrice();
  }, []);

  

  

  const handlePayment = async () => {
    if (!scriptLoaded) {
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/orders", { method: "POST" });
      const data = await res.json();

      if (!data.success) {
        alert("Failed to create order");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.razorpayOrderId, 
        amount: data.amount,
        currency: "INR",
        name: "Cartify", 
        description: "Purchase from Cartify",
        handler: async function (response:IRazorpayInterface) {
          
          // Send details to backend for verification
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            alert("Payment successful! 🎉");
            // Redirect to orders page or success page
            window.location.href = "/orders";
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: session.data?.user?.name ? String(session.data.user.name) : "",  // Use user name or empty string
          email: session.data?.user?.email ? String(session.data.user.email) : "",  // Use user email or empty string
          contact: "", // You can add user contact if available
        },
        theme: { 
          color: "#FACC15"  // yellow-400 to match your theme
        },
      };

      const rzp = new window.Razorpay(options);
      
      // Handle payment failure
      rzp.on('payment.failed', function (response:unknown) {
        console.error("Payment failed:", response);
        alert("Payment failed. Please try again.");
      });
      
      rzp.open();
    } catch (error) {
      alert("Payment failed due to an error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading || !scriptLoaded}
      className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 text-lg rounded-xl transition-colors shadow-lg hover:shadow-xl"
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
          Processing...
        </div>
      ) : !scriptLoaded ? (
        <Loader />
      ) : (
        <>Pay ₹{price.toFixed(2)}</>
      )}
    </Button>
  );
}

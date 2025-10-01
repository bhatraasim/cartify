// CartifySkeleton.tsx
import React from "react";

const categories = [
  "All", "T-Shirts", "Asscosories", "Shoes", "Jackets", "Gloves"
];

export default function CartifySkeleton() {
  return (
    <div className="min-h-screen bg-[#FCFCFE]">
      
      {/* Banner */}
      <div className="relative flex justify-center items-center mt-8 mb-8 h-60 animate-pulse">
        
      </div>
      {/* Categories */}
      <div className="flex gap-6 justify-center mb-8">
        {categories.map((cat) => (
          <div
            key={cat}
            className="w-28 h-10 bg-gray-200 rounded-md animate-pulse"
          />
        ))}
      </div>
      {/* Product grid */}
      <div className="flex flex-wrap gap-8 justify-center">
        {[1, 2, 3,].map((idx) => (
          <div
            key={idx}
            className="w-60 h-72 bg-gray-200 rounded-xl animate-pulse flex flex-col"
          >
            <div className="w-full h-44 bg-gray-300 rounded-t-xl animate-pulse" />
            <div className="flex-1 px-4 py-3">
              <div className="w-24 h-5 bg-gray-300 rounded mb-3 animate-pulse" />
              <div className="w-36 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

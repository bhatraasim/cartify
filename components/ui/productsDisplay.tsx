"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/model/Product";
import { useNotification } from "./Notification";
import { addToCart } from "@/app/actions/cart";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.size[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.color[0]);
  const [isPending, startTransition] = useTransition();
  const { showNotification } = useNotification();

  const handleAddToCart = () => {
    startTransition(async () => {
      if (!product._id) {
        console.error("Product ID is missing");
        return;
      }
      const result = await addToCart(product._id, 1);
      if (result.success) {
        showNotification("Added to cart successfully", "success");
      } else {
        showNotification(`Failed to add to cart: ${result.message}`, "error");
      }
    });
  };

  return (
    <div className="group rounded-2xl shadow-lg p-4 flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto border border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-yellow-400 cursor-pointer">
      {/* Product Image */}
      <div className="flex justify-center mb-4 overflow-hidden rounded-xl">
        <img
          src={product.url}
          alt={product.title}
          className="h-48 w-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
        />
      </div>

      {/* Product Info */}
      <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-yellow-600">
        {product.title}
      </h3>
      <p className="text-sm text-gray-500">{product.desc}</p>

      {/* Size & Color */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 gap-4">
        {/* Size */}
        <div className="w-full sm:w-auto">
          <p className="text-sm text-gray-500 mb-1">Size</p>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm w-full sm:w-auto transition-colors duration-300 hover:border-yellow-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none"
          >
            {product.size.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Color */}
        <div className="w-full sm:w-auto">
          <p className="text-sm text-gray-500 mb-1">Color</p>
          <div className="flex gap-2 mt-1">
            {product.color.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`h-6 w-6 rounded-full border-2 transition-all duration-300 hover:scale-125 hover:shadow-lg ${
                  selectedColor === color ? "border-gray-800 ring-2 ring-gray-300" : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Price + Add to Cart */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
        <span className="text-xl font-semibold transition-colors duration-300 group-hover:text-yellow-600">
          {product.price}
        </span>
        <Button 
          className="flex gap-2 justify-center w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg" 
          onClick={handleAddToCart}
          disabled={isPending}
        >
          🛒 {isPending ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

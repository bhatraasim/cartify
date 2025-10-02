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
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
      {/* Product Image */}
      <div className="flex justify-center mb-4">
        <img
          src={product.url}
          alt={product.title}
          className="h-48 w-full max-w-full object-contain"
        />
      </div>

      {/* Product Info */}
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-sm text-gray-500">{product.desc}</p>

      {/* Size & Color */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 gap-4">
        {/* Size */}
        <div className="w-full sm:w-auto">
          <p className="text-sm text-gray-500 mb-1">Size</p>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm w-full sm:w-auto"
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
                className={`h-6 w-6 rounded-full border-2 ${
                  selectedColor === color ? "border-gray-800" : "border-transparent"
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
        <span className="text-xl font-semibold">${product.price}</span>
        <Button className="flex gap-2 justify-center w-full sm:w-auto" onClick={handleAddToCart}>
          🛒 Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

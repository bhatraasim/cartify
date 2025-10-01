"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/model/Product";
import addToCart from "@/app/actions/cart";
import { useNotification } from "./Notification";



interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const [selectedSize, setSelectedSize] = useState<string>(product.size[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.color[0]);
  const [isPending, startTransition] = useTransition()
  const { showNotification } = useNotification();

    const handleAddToCart = () => {
    startTransition(async () => {
      if (!product._id) {
        console.error('Product ID is missing');
        return;
      }
      const result = await addToCart(product._id, 1)
      if (result.success) {
        // Show success toast
        showNotification('Added to cart successfully' , 'success')
      } else {
        showNotification(`Failed to add to cart: ${result.message}`, 'error');
      }
    })
  }

  return (
    <div className="w-72 bg-white rounded-2xl shadow-lg p-4 flex flex-col">
      {/* Product Image */}
      <div className="flex justify-center mb-4">
        <img
          src={product.url}
          alt={product.title}
          className="h-48 object-contain"
        />
      </div>

      {/* Product Info */}
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-sm text-gray-500">{product.desc}</p>

      {/* Size & Color */}
      <div className="flex items-center justify-between mt-3">
        {/* Size */}
        <div>
          <p className="text-sm text-gray-500">Size</p>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm"
          >
            {product.size.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Color */}
        <div>
          <p className="text-sm text-gray-500">Color</p>
          <div className="flex gap-2 mt-1">
            {product.color.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`h-5 w-5 rounded-full border-2 ${
                  selectedColor === color ? "border-gray-800" : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Price + Add to Cart */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-xl font-semibold">${product.price}</span>
        <Button className="flex gap-2" onClick={handleAddToCart} >
          🛒 Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

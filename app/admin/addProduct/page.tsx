'use client';
import Image from 'next/image';
import { useState, ChangeEvent, FormEvent } from 'react';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    price: '',
    category: '',
    size: [] as string[],
    color: [] as string[],
    url: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string>('');

  // Predefined options
  const categories = ['Electronics', 'Clothing', 'Accessories', 'Home & Garden', 'Sports', 'Books'];
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const colorOptions = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Pink', 'Purple', 'Orange', 'Gray'];

  // Handle text inputs and select changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  // Toggle multi-select options for size/color
  const handleMultiSelect = (field: 'size' | 'color', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };



  // Handle image upload and preview
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) setPreview(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload to Cloudinary (replace your_cloud_name and upload_preset)
  const uploadToCloudinary = async (file: File) => {
    const formDataObj = new FormData();
    formDataObj.append("file", file);
    formDataObj.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formDataObj,
        }
      );
      const data = await response.json();
      return data.secure_url; // <-- This is what you'll store in Mongo
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  // Form submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        url: imageUrl
      };

      const response = await fetch('/api/productUpload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product added successfully!');
        // Reset form
        setFormData({
          title: '',
          desc: '',
          price: '',
          category: '',
          size: [],
          color: [],
          url: ''
        });
        setImageFile(null);
        setPreview('');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Add New Product</h1>
          <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-yellow-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              {preview ? (
                <div className="relative">
                  <Image src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-md" />
                  <div className="mt-4 text-sm text-gray-600">Click to change image</div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600">Upload product image</p>
                    <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              )}
            </label>
          </div>

          {/* Title & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                placeholder="Enter product title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                step="0.01"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
              placeholder="Describe your product..."
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Available Sizes</label>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleMultiSelect('size', size)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    formData.size.includes(size)
                      ? 'bg-yellow-400 text-white border-yellow-400'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-yellow-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Available Colors</label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleMultiSelect('color', color)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    formData.color.includes(color)
                      ? 'bg-yellow-400 text-white border-yellow-400'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-yellow-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-white py-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>

        {/* Selected Items Display */}
        {(formData.size.length > 0 || formData.color.length > 0) && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            {formData.size.length > 0 && (
              <div className="mb-3">
                <span className="text-sm font-medium text-gray-700">Selected Sizes: </span>
                <span className="text-sm text-gray-600">{formData.size.join(', ')}</span>
              </div>
            )}
            {formData.color.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-700">Selected Colors: </span>
                <span className="text-sm text-gray-600">{formData.color.join(', ')}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

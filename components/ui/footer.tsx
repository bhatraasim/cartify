import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + About */}
        <div>
          <h1 className="text-2xl font-bold">
            Cart<span className="text-yellow-400">ify</span>
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Your trusted e-commerce store for the best deals on clothing,
            gadgets, and more. Shop smart with Cartify.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-yellow-400 inline-block pb-1">
            Shop
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>Men</li>
            <li>Women</li>
            <li>Electronics</li>
            <li>Accessories</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-yellow-400 inline-block pb-1">
            Company
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-yellow-400 inline-block pb-1">
            Stay Updated
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Subscribe to our newsletter for offers and updates.
          </p>
          <div className="mt-3 flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 rounded-l-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
            <button className="px-4 bg-yellow-400 text-white font-medium rounded-r-md hover:bg-yellow-500">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Cartify. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0 text-gray-500">
            <Facebook className="w-5 h-5 hover:text-yellow-400 cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-yellow-400 cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-yellow-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

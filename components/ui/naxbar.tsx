import { Button } from "@/components/ui/button";
import { Bell,  Home, ShoppingBag } from "lucide-react";
import React from "react";

function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 shadow-md bg-white rounded-lg sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 py-5">
        <img src="/logo.png" alt="Logo"  className="h-10 w-auto " />
      
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
        />
        <Button  variant="outline" className="bg-yellow-400" >Search</Button>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4">
        <Home />
        <Bell />
        <ShoppingBag />
        <div className="">
          <Button variant="outline" className="bg-yellow-400 py-2 px-4 rounded-2xl outline">Sign In</Button>
        </div>
        {/* <div className=" bg-yellow-400 py-2 px-4 rounded-2xl outline"><SignInButton  /></div> */}
      </div>
    </div>
  );
}

export default Navbar;

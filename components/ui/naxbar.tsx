'use client'
import { Button } from "@/components/ui/button";
import { Bell,  Home, ShoppingBag } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Navbar() {
  const { data: session , status } = useSession();
  const router  = useRouter()
  
  function handleSignin() {
    router.push("/login")
  }

  if (!session) {
    return (null)
  }

  if (!session.user.isAdmin) {
    return null
  }


  return (
    
    <div className="flex items-center justify-between px-6 shadow-md bg-white rounded-lg sticky top-0 z-50">
      {/* Logo */}
      <Button asChild variant="outline" className="flex items-center gap-2 py-5 my-2">
        <Link href="/">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        </Link>
      </Button>

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

        <div className="">
          <Link 
                  href="/admin" 
                  className="bg-yellow-400 hover:bg-red-200 px-3  rounded transition-colors py-2"
                >
                  Admin Panel
                </Link>
        </div>
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <Home />
        <Bell />
        <ShoppingBag />
        
        
        { session ? (
           <div className="">
              <Button variant="outline" onClick={() => signOut({ callbackUrl: "/login" })}  >Log Out</Button>
           </div>
        ):
        (
           <div className="">
          <Button variant="outline" className="bg-yellow-400 py-2 px-4 rounded-2xl outline" onClick={ handleSignin}>Sign In</Button>
        </div>
        )}
        
      
        
        
      </div>
    </div>
  );
}

export default Navbar;

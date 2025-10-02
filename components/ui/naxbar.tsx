'use client'
import { Button } from "@/components/ui/button";
import { Bell, Home, ShoppingBag } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import Search from "./Search";

function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleSignin() {
    router.push("/login");
  }

  // Close menu if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md rounded-lg px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
      {/* Logo aligned left on all screen sizes */}
      <Button
        asChild
        variant="outline"
        className="flex items-center gap-2 py-2 my-0 flex-shrink-0 order-1"
      >
        <Link href="/">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        </Link>
      </Button>

      {/* Search bar and mobile menu grouped, ordered second */}
      <div className="flex flex-grow items-center gap-2 min-w-[150px] max-w-xl order-2">
        <div className="flex-grow">
          <Search />
        </div>

        {/* Mobile three dots menu button */}
        <div className="md:hidden relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
            className="text-gray-700 focus:outline-none p-2 rounded hover:bg-gray-200"
          >
            {/* Vertical three dots icon */}
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
              {session?.user?.isAdmin && (
                <Link
                  href="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}

              {session?.user?.image && (
                <div className="flex items-center px-4 py-2">
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <span className="ml-2 text-sm text-gray-700">Profile</span>
                </div>
              )}

              <Link
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/notifications"
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <Bell className="inline-block" /> Notifications
              </Link>

              <Link
                href="/cart/shopingCart"
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <ShoppingBag className="inline-block" /> Cart
              </Link>

              {session ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleSignin();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign In
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Menu aligned right, ordered third */}
      <div className="hidden md:flex items-center gap-3 whitespace-nowrap flex-shrink-0 order-3">
        {session?.user?.isAdmin && (
          <Link
            href="/admin"
            className="bg-yellow-400 hover:bg-red-200 px-3 rounded transition-colors py-2 text-sm"
          >
            Admin Panel
          </Link>
        )}

        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}

        <Home className="cursor-pointer" />
        <Bell className="cursor-pointer" />
        <Link href="/cart/shopingCart">
          <ShoppingBag className="cursor-pointer" />
        </Link>

        {session ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Log Out
          </Button>
        ) : (
          <Button
            variant="outline"
            className="bg-yellow-400 py-2 px-4 rounded-2xl outline-none"
            onClick={handleSignin}
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

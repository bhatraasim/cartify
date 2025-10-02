'use client'
import MenuBar from "@/components/ui/menuBar";
import Footer from "@/components/ui/footer";
import ProductCard from "@/components/ui/productsDisplay";
import { IProduct } from "@/model/Product";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NotificationProvider } from "@/components/ui/Notification";
import AppLayout from "./Applayout";
import Home from "@/app/page";
import HomePagePagination from "./HomePagePagination";

export default function HomePageContent() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async function () {
      try {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: search }),
        });
        const data = await res.json();
        if (data.success) setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts()
  }, [search])

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/login"
    },
  })

  if (status === "loading") return <AppLayout />
  if (loading) return <AppLayout />
  if (!session) {
    router.push("/login")
    return null
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex justify-center items-center mt-4 px-2">
        <img
          loading="lazy"
          src='/front.png'
          alt='hero'
          className="w-full max-w-5xl h-auto rounded-lg object-cover shadow-md"
        />
      </div>

      <div className="flex justify-center mt-4 px-2">
        <MenuBar />
      </div>

      <div className="flex-1 px-2 sm:px-4 md:px-8 max-w-7xl mx-auto w-full py-8">
        <HomePagePagination products={products} />
      </div>

      <Footer />
    </div>
  );
}

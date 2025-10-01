// app/components/HomePageContent.tsx
'use client'
import MenuBar from "@/components/ui/menuBar";
import Footer from "@/components/ui/footer";
import ProductCard from "@/components/ui/productCard";
import { IProduct } from "@/model/Product";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NotificationProvider } from "@/components/ui/Notification";
import AppLayout from "./Applayout";

export default function HomePageContent() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ;

 useEffect(() => {
  const fetchProducts = async function () {
    try {
       const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: search }), // send the search string here
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
}, [search]) // Add 'search' to dependency array


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

    <div className=" ">
      <div className="flex justify-center">
        <img loading="lazy" src='/front.png' width={1000} height={500} alt='main picture' />
      </div>
      <div className="flex justify-center">
        <MenuBar />
      </div>

      <div className="display grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 my-15 mx-30">

       
        {products.map((product) => (
          <NotificationProvider  key={String(product._id)}>
            <ProductCard key={String(product._id)} product={product} />
          </NotificationProvider>
        ))}
      </div>

      <Footer />
    </div>
  );
}
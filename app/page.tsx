'use client'
import Footer from "@/components/ui/footer";
import ProductCard from "@/components/ui/prodecutCard";
import { IProduct } from "@/model/Product";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setproducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter();



  useEffect(() => {
    const fetchProducts = async function () {
      try {
        const res = await fetch("/api/products")
        const data = await res.json()

        if(data.success){
          setproducts(data.products)
        }


      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts()
  }, [])
  
  




    const { data: session, status } = useSession({
          required: true,
          onUnauthenticated() {
          window.location.href = "/login"
          },
      })
  
      if (status === "loading") return <p>Loading...</p>
  
      if (!session) {
          router.push("/login")
          return null
      }
  return (

    <div className=" ">
      
    <div className="display grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 my-15 mx-30">
      

      { products.map( (product) => (
        <ProductCard key={String(product._id)} product={product}  />
      ))}
    </div>

    <Footer />
    </div>
  );
}

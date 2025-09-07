'use client'
import Footer from "@/components/ui/footer";
import ProductCard from "@/components/ui/prodecutCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

    const product = {
    name: "Under Armour StormFleece",
    description: "Lightweight and warm hoodie for all seasons.",
    price: 49.9,
    image: "logo.png",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#ff0000", "#ffcc00", "#000000"], // red, yellow, black
  };


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
      <ProductCard product={product} />
      <ProductCard product={product} />
      <ProductCard product={product} />
      <ProductCard product={product} />
    </div>

    <Footer />
    </div>
  );
}

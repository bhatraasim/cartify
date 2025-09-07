import Footer from "@/components/ui/footer";
import ProductCard from "@/components/ui/prodecutCard";

export default function Home() {

    const product = {
    name: "Under Armour StormFleece",
    description: "Lightweight and warm hoodie for all seasons.",
    price: 49.9,
    image: "logo.png",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#ff0000", "#ffcc00", "#000000"], // red, yellow, black
  };
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

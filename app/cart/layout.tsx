import CartSliderBar from "@/components/ui/CartSliderBar";



export default function Cart({ children }: { children: React.ReactNode }) {
  return (
    <section>

      <div className="text-center ">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Shopping Cart
        </h1>
        <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        <p className="text-gray-500 mt-4 text-lg">Complete your purchase</p>
      </div>

      <CartSliderBar />
      {children}
    </section>
  )
}



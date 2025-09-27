'use client'
import clsx from "clsx"
import { usePathname } from "next/navigation"

export default function CartSliderBar() {
  const pathname = usePathname()
  return (
    <div className="flex  flex-col justify-center items-center mx-6 my-2 rounded-4xl sticky top-14  bottom-10 z-50 mt-10 bg-white ">

      <div className=" p-4 rounded-2xl flex gap-50 font-semibold  justify-between items-center mt-5 ">

        <div className={clsx(pathname == "/cart/shopingCart" ? 'underline decoration-yellow-500 decoration-2 underline-offset-8 m-1 ' : 'text-slate-500')} >

          Shopping Cart
        </div>
        <div className={clsx(pathname == "/cart/shippingAdress" ? 'underline decoration-yellow-500 decoration-2 underline-offset-8 m-1 ' : 'text-slate-500')} >
          Shipping adress
        </div>
        <div className={clsx(pathname == "/cart/payment" ? 'underline decoration-yellow-500 decoration-2 underline-offset-8 m-1 ' : 'text-slate-500')}>
          Payment
        </div>
      </div>


    </div>
  )
}



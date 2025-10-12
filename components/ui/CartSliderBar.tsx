'use client'

import { motion } from "framer-motion"
import clsx from "clsx"
import { usePathname, useRouter } from "next/navigation"

const steps = [
  { name: "Shopping Cart", path: "/cart/shopingCart" },
  { name: "Shipping Address", path: "/cart/shippingAdress" },
  { name: "Payment", path: "/cart/payment" },
]

export default function CartSliderBar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center mx-6 my-2 sticky top-14 z-50 mt-10 bg-white shadow-lg rounded-2xl border border-gray-100"
    >
      <div className="flex justify-between items-center w-full max-w-xl p-5">
        {steps.map((step, index) => {
          const isActive = pathname === step.path

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push(step.path)}
              className={clsx(
                "relative flex flex-col items-center cursor-pointer select-none transition-all duration-300 px-3 py-2",
                isActive
                  ? "text-yellow-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <span className="text-sm md:text-base">{step.name}</span>

              {/* Animated underline for active step */}
              {isActive && (
                <motion.div
                  layoutId="activeStep"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-yellow-500 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Progress line connecting the steps */}
      <div className="w-full max-w-xl h-[2px] bg-gray-100 relative">
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-yellow-500"
          initial={{ width: "0%" }}
          animate={{
            width:
              pathname === "/cart/shopingCart"
                ? "33%"
                : pathname === "/cart/shippingAdress"
                ? "66%"
                : pathname === "/cart/payment"
                ? "100%"
                : "0%",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  )
}

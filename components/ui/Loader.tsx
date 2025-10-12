"use client"
import { motion } from "framer-motion"

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <motion.div
        className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
    </div>
  )
}

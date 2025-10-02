import React from 'react'
import { FaShoePrints } from 'react-icons/fa'

function MenuBar() {
  return (
    <div className="bg-slate-100 rounded-2xl text-slate-500 w-full overflow-x-auto py-2">
      <div className="flex gap-2 sm:gap-4 px-2 sm:px-6 whitespace-nowrap md:justify-center md:w-full md:max-w-4xl md:mx-auto">
        <div className="flex items-center hover:bg-slate-200 px-4 py-1 rounded-2xl cursor-pointer">All</div>
        <div className="flex items-center hover:bg-slate-200 px-4 py-1 rounded-2xl cursor-pointer">T-Shirts</div>
        <div className="flex items-center hover:bg-slate-200 px-4 py-1 rounded-2xl cursor-pointer">Accessories</div>
        <div className="flex items-center hover:bg-slate-200 px-4 py-1 rounded-2xl cursor-pointer">
          <FaShoePrints className="mr-2" /> Shoes
        </div>
        <div className="flex items-center hover:bg-slate-200 px-4 py-1 rounded-2xl cursor-pointer">Jackets</div>
      </div>
    </div>
  )
}

export default MenuBar

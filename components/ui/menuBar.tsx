import React from 'react'
import { FaShoePrints } from 'react-icons/fa'

function MenuBar() {
  return (
    <div className="bg-slate-100 rounded-2xl text-slate-500 w-full flex overflow-x-auto gap-2 sm:gap-4 px-2 sm:px-6 py-2 whitespace-nowrap">
      <div className="flex items-center hover:bg-slate-200 px-4 py-1 rounded-2xl cursor-pointer">All</div>
      <div className="flex items-center hover:bg-slate-200 px-4 py-1 rounded-2xl cursor-pointer">T-Shirts</div>
      <div className="flex items-center hover:bg-slate-200 px-4 py-1 rounded-2xl cursor-pointer">Accessories</div>
      <div className="flex items-center hover:bg-slate-200 px-4 py-1 rounded-2xl cursor-pointer">
        <FaShoePrints className="mr-2" /> Shoes
      </div>
      <div className="flex items-center hover:bg-slate-200 px-4 py-1 rounded-2xl cursor-pointer">Jackets</div>
      <div className="flex items-center hover:bg-slate-200 px-4 py-1 rounded-2xl cursor-pointer">Gloves</div>
    </div>
  )
}

export default MenuBar

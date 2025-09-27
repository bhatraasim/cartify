import React from 'react'
import { FaShoePrints } from 'react-icons/fa'

function MenuBar() {
  return (
    <div className='bg-slate-100  rounded-2xl text-slate-500 w-full mx-35 flex justify-between px-10 py-1'>
      <div className="flex justify-center items-center hover:bg-slate-200 p-2 rounded-2xl">  All</div>  
      <div className="flex justify-center items-center hover:bg-slate-200 p-2 rounded-2xl">  T-Shirts</div>  
      <div className="flex justify-center items-center hover:bg-slate-200 p-2 rounded-2xl" > Asscosories</div>  
      <div className="flex justify-center items-center hover:bg-slate-200 p-2 rounded-2xl">  Shoes</div>  
      <div className="flex justify-center items-center hover:bg-slate-200 p-2 rounded-2xl">  Jackets</div>  
      <div className="flex justify-center items-center hover:bg-slate-200 p-2 rounded-2xl">  Gloves</div>  
    </div>
  )
}

export default MenuBar

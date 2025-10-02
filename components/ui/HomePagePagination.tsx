import { IProduct } from '@/model/Product'
import React, { useState } from 'react'
import { NotificationProvider } from './Notification'
import ProductCard from './productsDisplay'

function HomePagePagination({ products }: { products: IProduct[] }) {
  const page_size = 6
  const [currentPage, setCurrentPage] = useState<number>(0)

  const start = currentPage * page_size
  const end = start + page_size
  const totalPages = Math.ceil(products.length / page_size)
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.slice(start , end ).map((product) => (
          <NotificationProvider key={String(product._id)}>
            <ProductCard key={String(product._id)} product={product} />
          </NotificationProvider>
        ))}
      </div>
      <div className="flex justify-center items-center"> {
        [...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`mx-5 my-5 px-3 py-1 rounded ${page === currentPage ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'
              }`}
          >
            {page + 1}
          </button>
        ))
      }</div>
    </div>
  )
}

export default HomePagePagination

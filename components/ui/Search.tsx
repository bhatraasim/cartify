'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

function Search() {
    const router = useRouter()
    const [text, setText] = useState("")
    const [query] = useDebounce(text, 500)
    

    useEffect(() => {
        if(!query){
            router.push("/")
        }else{
            router.push(`/?search=${query}`)
        }
        
    }, [query , router])
    
  return (
    <div>
      <div className="flex items-center gap-2 w-full max-w-md">
        <input
          type="text"
          value={text}
          placeholder="Search..."
          onChange={(e) => setText(e.target.value)}
          className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
        />
      </div>
    </div>
  )
}

export default Search

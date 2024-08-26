"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function CategoryList({categoryList}) {
  return (
    <div>
      <h2 className='text-green-700 font-bold text-2xl md:text-3xl text-center md:text-left py-8 md:py-4'>Shop By Category</h2>
      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4'>
        {categoryList.map((category, index)=>(
        <Link href={'/products-category/'+category.attributes.name} key={index} >
        <div  className='flex flex-col items-center justify-center hover:bg-green-600 py-4 shadow-lg rounded-2xl group cursor-pointer bg-white shadow-slate-400 border border-green-600 '>
          <Image 
          width={200} 
          height={200} 
          src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+category?.attributes?.icon?.data[0]?.attributes?.url}
           className='w-12 h-12 group-hover:scale-125 transition-all ease-in-out my-2 '
           />
          <h2 
          className='text-md group-hover:text-white group-hover:tracking-wider font-bold text-green-900'>{category?.attributes?.name}
          </h2>
        </div>
        </Link>
        ))}
      </div>

    </div>
  )
}

export default CategoryList

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function TopCategoryList({categoryList, selectedCategory}) {
  return (
    <div className='flex gap-4 my-4 flex-wrap items-center justify-center mx-7 md:mx-10 pb-4 md:overflow-auto'>
    {categoryList.map((category, index)=>(
    <Link href={'/products-category/'+category.attributes.name} 
    key={index}
     className={`flex flex-col items-center justify-center bg-white py-4 rounded-2xl group cursor-pointer hover:bg-green-600 w-[150px] mix-w-[100px] border border-green-600
      ${selectedCategory == category.attributes.name && `bg-green-700 text-white`}
     `}>
      <Image 
      width={200} 
      height={200} 
      src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+category?.attributes?.icon?.data[0]?.attributes?.url}
       className='w-12 h-12 group-hover:scale-125 transition-all ease-in-out my-2'
       />
      <h2 className='text-md font-bold'>{category?.attributes?.name}</h2>
    </Link>
    ))}
  </div>
  )
}

export default TopCategoryList

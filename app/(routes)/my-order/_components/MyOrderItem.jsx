'use client'
import React, { useEffect } from 'react'
import Image from 'next/image';

function MyOrderItem({ orderItem }) {
  useEffect(() => {
    // console.log(orderItem); // Log the entire orderItem array
  }, [orderItem]);

  return (
    <div>
      {orderItem?.map((product, index) => {
        // Extract product attributes and image URL
        const productData = product?.products?.data[0]?.attributes;
        const imageUrl = productData?.images?.data[0]?.attributes?.url;
        const imageSrc = imageUrl ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${imageUrl}` : '/default-image.png'; 

        // Log imageSrc to debug URL issues
        // console.log(`Image URL for product ${index}: ${imageSrc}`);

        return (
          <div
            className='flex gap-10 justify-evenly items-center my-6 border border-green-300 md:w-[50%] w-[90%] mx-auto shadow py-2 bg-slate-100 rounded'
            key={index}
          >
            {imageUrl ? (
              <Image
                src={imageSrc}
                width={80}
                height={80}
                alt={`Product ${index}`}
                onError={(e) => e.target.src = '/default-image.png'}
              />
            ) : (
              <div className='w-20 h-20 bg-gray-200 flex justify-center items-center'>
                <span>No Image</span>
              </div>
            )}
            <div className='flex flex-col justify-center items-start'>
              <h2>{productData?.name || 'Product Name'}</h2>
              <h2>Item Price: {productData?.mrp || 'N/A'}</h2>
            </div>
            <h2 className='flex justify-center items-center'>
              Quantity: {product?.quantity || '0'}
            </h2>
          </div>
        )
      })}
    </div>
  )
}

export default MyOrderItem

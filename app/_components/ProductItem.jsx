import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

import ProductItemDetail from './ProductItemDetail'


function ProductItem({product}) {
  return (
    <div className='p-2 md:p-6 flex flex-col justify-center items-center rounded-lg  gap-2 hover:shadow-inner hover:scale-105 transition-all ease-in-out bg-white shadow shadow-slate-400 border-[2px] border-green-600'>
      <div className='bg-white'>
      <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+product.attributes.images.data[0].attributes.url}
      width={300}
      height={300}
      alt={product.attributes.name}
      className='w-full h-full  mix-blend-multiply'
      />
      </div>
      
      <h2 className='text-bold'>{product.attributes.name}</h2>
      <div className='flex gap-3'>
          {product.attributes.sellingPrice&& <h2 className='text-bold'>Rs {product.attributes.sellingPrice}</h2>}
          <h2 className={`${product.attributes.sellingPrice && 'line-through text-slate-500'} `}>Rs {product.attributes.mrp}</h2>
      </div>
   

  <Dialog>
  <DialogTrigger asChild>
  <Button variant='outline' className='bg-green-600 hover:text-green-600 border-[2px] border-green-600 text-white font-bolder hover:bg-white'>Add to Cart</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogDescription>
        <ProductItemDetail product={product}/>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default ProductItem

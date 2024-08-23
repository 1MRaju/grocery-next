"use client"
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'



function CartItemList({ cartItemList, onDeleteItem }) {

  return (
    <div>
      {/* Scrollable container for cart items */}
      <div className="h-[70vh] overflow-auto">
        {cartItemList.map((cart, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-6 my-3 border-2 border-green-600 shadow-lg p-2"
          >
            <Image
              src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart.image}
              width={70}
              height={70}
              alt={cart.name}
              className="border border-green-400 m-2"
            />
            <div className="text-green-600 flex-grow">
              <h2 className="font-bold">{cart.name}</h2>
              <h2>Quantity: {cart.quantity}</h2>
              <h2 className="text-lg font-bold">Rs. {cart.amount}</h2>
            </div>
            <TrashIcon className="text-black cursor-pointer" onClick={()=>onDeleteItem(cart.id)} />
          </div>
        ))}
      </div>
    
    </div>
  )
}

export default CartItemList

"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingBasket, LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlobalApi from '../_utils/GlobalApi';
import { toast } from 'sonner';
import { useCart } from '../_context/UpdateCartContext';

function ProductItemDetail({ product }) {
  const jwt = sessionStorage.getItem('jwt');
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [productTotalPrice, setProductTotalPrice] = useState(product.attributes.sellingPrice || product.attributes.mrp);
  const [quantity, setQuantity] = useState(1);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const { updateCartItemCount, updateCartItems } = useCart(); 

  const addToCart = async () => {
    setLoader(true);
    if (!jwt) {
      updateCartItemCount()
      router.push('/sign-in');
      setLoader(false);
      return;
    }

    const data = {
      data: {
        quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product.id,
        users_permissions_user: user.id,
        userid: user.id
      }
    };

    try {
      await GlobalApi.addToCart(data, jwt);
      updateCartItems(); 
      toast('Added to Cart');
    } catch (error) {
      toast('Error while adding to cart');
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <Image
        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.attributes.images.data[0].attributes.url}
        width={300}
        height={300}
        alt={product.attributes.name}
        className='h-[280px] w-[220px] mx-auto block md:h-[320px] md:w-[320px] md:object-contain'
      />
      <div className='flex flex-col gap-2'>
        <h2 className='text-3xl font-bold text-black'>{product.attributes.name}</h2>
        <h2 className='text-sm font-bold text-gray-500'>{product.attributes.description}</h2>
        <div className='flex gap-3 items-center justify-center md:justify-start '>
          {product.attributes.sellingPrice && <h2 className='text-bold text-lg text-black underline'>Rs {product.attributes.sellingPrice}</h2>}
          <h2 className={`${product.attributes.sellingPrice ? 'line-through text-slate-500 text-lg' : ''}`}>
            Rs {product.attributes.mrp}
          </h2>
          <h2 className='text-bold text-md tracking-wider bg-green-600 text-white p-1 -skew-x-[22deg]'>
            -{Math.floor((product.attributes.mrp - product.attributes.sellingPrice) / product.attributes.mrp * 100)}% OFF
          </h2>
        </div>
        <h2 className='text-lg font-bold'>
          <span className='font-bold text-black text-md'>Quantity: </span> ({product.attributes.itemQuantityType})
        </h2>
        <div className='flex flex-col gap-3 md:items-baseline items-center justify-center md:justify-start'>
          <div className='flex gap-5 items-center justify-between'>
            <div className='p-1 flex gap-5 items-center justify-center px-5 bg-green-600 bg-opacity-80 rounded-full'>
              <button
                className='flex items-center justify-center rounded-full w-8 h-8 bg-green-600 text-white text-xl p-4 shadow-2xl'
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity === 1}
              >
                - 
              </button>
              <h2 className='text-2xl w-6 text-center text-white'>{quantity}</h2>
              <button
                className='flex items-center justify-center shadow-2xl rounded-full w-8 h-8 bg-green-600 text-white text-xl p-4'
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <h2 className='font-bold text-black text-lg px-5 p-1 underline'>
              Total = Rs {quantity * productTotalPrice}
            </h2>
          </div>
          <Button className='flex gap-2 my-3 bg-green-600 ' onClick={addToCart} disabled={loader}>
            <ShoppingBasket />
            {loader ? <LoaderIcon className='animate-spin' /> : 'Add To Cart'}
          </Button>
        </div>
        <h2 className='text-lg'>
          <span className='font-bold text-black text-lg'>Category: </span>{product.attributes.categories.data[0].attributes.name}
        </h2>
      </div>
    </div>
  );
}

export default ProductItemDetail;

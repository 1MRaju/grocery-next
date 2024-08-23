"use client"
import React, { useEffect, useState } from 'react';
import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import GlobalApi from '../_utils/GlobalApi';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"

import { useCart } from '../_context/UpdateCartContext';


import CartItemList from './CartItemList';

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  // const [user, setUser] = useState(null);
  // const [jwt, setJwt] = useState(null);
  // const { totalCartItem, updateCartItemCount } = useCart();
  const { totalCartItem, cartItemList, updateCartItemCount, updateCartItems, jwt, user } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  // const [cartItemList, setCartItemList] = useState([]);

  // console.log(user);
  // console.log(jwt);

  // useEffect(() => {
  //   const fetchUserData = () => {
  //     try {
  //       const userData = JSON.parse(sessionStorage.getItem('user'));
  //       const jwt = sessionStorage.getItem('jwt');
  //       if (userData && jwt) {
  //         setUser(userData);
  //         setJwt(jwt);
  //       }
  //     } catch (error) {
  //       console.error('Error parsing user data from sessionStorage:', error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  useEffect(() => {
    getCategoryList();
  }, []);

  // useEffect(() => {
  //   if (jwt) {
  //     // getCartItems(); 
  //     // Corrected function call to match the intended behavior
  //     updateCartItems()
  //   }
  // }, [user, jwt]);
   
  useEffect(() => {
      // getCartItems(); 
      // Corrected function call to match the intended behavior
      updateCartItems();
  }, [jwt, user]); 

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/sign-in'); 
  };

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.data.data);
    });
  };

  // const getCartItems = async () => {
  //   if (!user || !jwt) return;

  //   try {
  //     const cartItems = await GlobalApi.getCartItems(user.id, jwt);
  //     updateCartItemCount(cartItems?.length || 0);
  //     setCartItemList(cartItems);
  //   } catch (error) {
  //     console.error('Error fetching cart items:', error);
  //   }
  // };

  const onDeleteItem = (id) => {
    if (!user || !jwt) return;

    GlobalApi.deleteCartItem(id, jwt).then(resp => {
      toast('Item removed!');
      getCartItems(); // Refresh cart items after deletion
    }).catch(error => {
      console.error('Error deleting cart item:', error);
    });
  };

  const [subtotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach(item => {
      total += item.amount;
    });
    setSubTotal(total);
  }, [cartItemList]);

  const checkAuth = () => {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      router.push('/checkout'); 
    } else {
      router.push('/sign-in');
    }
  };


  if (pathname === '/sign-in' || pathname === '/create-account') {
    return null;
  }

  return (
    <div className='bg-slate-800 container flex items-center justify-around py-3 gap-5 z-1000'>
      <div className='w-[80px] md:w-[105px]'>
        <Link href={'/'}>
        <Image width={125} height={70} src='/favicon.png' alt='logo image' className='w-[90%]' /> 
        </Link>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <h2 className='hidden md:flex gap-1 items-center bg-white text-green-600 py-2 px-4 rounded-lg cursor-pointer font-bold tracking-widest'>
            <LayoutGrid className='h-4 w-4 font-bold' />
            Category
          </h2>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categoryList?.map((category, index) => {
            const imageUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.attributes?.icon?.data[0]?.attributes?.url;
            return (
              <Link href={'/products-category/' + category.attributes.name} key={index}>
                <DropdownMenuItem className='flex gap-2 items-center cursor-pointer'>
                  <Image src={imageUrl} alt='icon' width={23} height={23} />
                  <h2 className='text-md font-bold'>{category?.attributes?.name}</h2>
                </DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className='bg-white hidden md:flex p-2 rounded-sm md:w-[420px]'>
        <Search className='text-green-600 font-bold' />
        <input type='text' placeholder='Search Your Product...' className='outline-none rounded text-green-600 placeholder-green-600 bg-white tracking-widest md:w-[400px]' />
      </div>

      <div className='flex items-center justify-center p-2 gap-3 rounded-2xl shadow-sm'>
        <Sheet>
          <SheetTrigger>
            <h1 className='flex gap-2 bg-white p-2 rounded-lg px-3 text-green-600'>
              <ShoppingBag className='text-green-600 font-xl' />
              <span className='text-white bg-green-600 w-6 h-6 rounded-full'>{totalCartItem}</span>
            </h1>
          </SheetTrigger>
          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle className='bg-green-600 font-bold text-xl p-2 text-center text-white'>My Cart</SheetTitle>
              <SheetDescription>
                <CartItemList cartItemList={cartItemList} onDeleteItem={onDeleteItem} />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="absolute w-[90%] bottom-18 flex flex-col p-4 bg-white border-t border-gray-300">
                <h2 className="text-lg font-bold flex justify-between">Subtotal <span>Rs {subtotal}</span></h2>
                <Button className='tracking-widest' onClick={checkAuth}>Checkout</Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger className='outline-none' asChild>
            <CircleUserRound className='p-1 text-white rounded-full h-12 w-12' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>

            <Link href={'/my-order'}>
              <DropdownMenuItem  className='cursor-pointer'>My Orders</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
export default Header;

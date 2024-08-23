'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';
import { useRouter} from 'next/navigation';
import { LoaderIcon } from 'lucide-react';
import { useCart } from '@/app/_context/UpdateCartContext';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const { updateCartItems } = useCart();

  // Check for authentication on component mount
  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      updateCartItems(); 
      router.push('/');
    }
  }, [router, updateCartItems]);

  const onSignIn = async () => {
    try {
      setLoader(true);
      const resp = await GlobalApi.SignIn(email, password);
      sessionStorage.setItem('user', JSON.stringify(resp.data.user));
      sessionStorage.setItem('jwt', resp.data.jwt);
      
      await updateCartItems(); // Wait for cart items to be updated
      toast("Login Successfully");
      router.push('/');
    } catch (e) {
      console.error(e);
      toast(e?.response?.data?.error?.message);
    } finally {
      setLoader(false);
    }
  };

  return (
   <div className='container flex items-center justify-center'>
        <div className='flex flex-col items-center justify-between bg-slate-200 md:w-[70%] p-5 my-10'>
          <Image src='/favicon.png' width={200} height={200} alt='logo' />
          <h2 className='font-bold text-3xl'>Sign In to Account</h2>
          <h2 className='font-bold text-xl text-center md:text-3xl text-green-600'>Enter Your Email & Password to Sign In</h2>
          <div className='w-full md:w-[90%] flex flex-col gap-5 mt-7'>
            <Input 
              placeholder='name@example.com'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button 
              onClick={onSignIn} 
              disabled={!email || !password}
              className='bg-green-600'
            >
             {loader ? <LoaderIcon className='animate-spin'/> : 'Sign In'} 
            </Button>
            <p>Don't have an account? 
              <Link href='/create-account' className='underline text-blue-500'> click here to create new account</Link>
            </p>
          </div>
        </div>
      </div>
  );
}

export default SignIn;

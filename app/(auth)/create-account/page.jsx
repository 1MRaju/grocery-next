'use client'; // Ensure this is at the very top

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LoaderIcon } from 'lucide-react';

const CreateAccount = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const router = useRouter(); 


  useEffect(()=>{
    const jwt = sessionStorage.getItem('jwt');
    if(jwt){
      router.push('/');
    }
  },[])

  const onCreateAccount = async () => {
    try {
      setLoader(true)
      const resp = await GlobalApi.registerUser(username, email, password);
      console.log(resp.data.user);
      console.log(resp.data.jwt);
      sessionStorage.setItem('user', JSON.stringify(resp.data.user));
      sessionStorage.setItem('jwt', resp.data.jwt);
      toast("Account Created Successfully");
      setLoader(false)
      router.push('/sign-in');
    } catch (e) {
      toast(e?.response?.data?.error?.message);
      setLoader(false)
    }
  };

  return (
    <div className='container flex items-center justify-center'>
      <div className='flex flex-col items-center justify-between bg-slate-200 md:w-[70%] p-5 my-10'>
        <Image src='/favicon.png' width={200} height={200} alt='logo' />
        <h2 className='font-bold text-3xl'>Create Account</h2>
        <h2 className='font-bold text-xl text-center md:text-3xl text-green-600'>Enter Your Email & Password to Create an Account</h2>
        <div className='w-full md:w-[90%] flex flex-col gap-5 mt-7'>
          <Input 
            placeholder='Username'
            onChange={(e) => setUserName(e.target.value)}
          />
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
            onClick={()=>onCreateAccount()} 
            disabled={!(username || email || password)}
            className='bg-green-600'
          >
              {loader?<LoaderIcon className='animate-spin'/>:'Create an Account'} 
          </Button>
          <p>Already have an account? 
            <Link href='/sign-in' className='underline text-blue-500'> click here to sign-in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;

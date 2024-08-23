'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GlobalApi from '@/app/_utils/GlobalApi';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from 'moment';
import MyOrderItem from './_components/MyOrderItem';

function MyOrder() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        const jwtToken = sessionStorage.getItem('jwt');
        if (userData && jwtToken) {
          setUser(userData);
          setJwt(jwtToken);
        } else {
          throw new Error('User data or JWT is missing');
        }
      } catch (error) {
        console.error('Error parsing user data from sessionStorage:', error);
        router.replace('/'); 
      } finally {
        setLoading(false); 
      }
    };
    fetchUserData();
  }, [router]);

  const getMyOrder = async () => {
    try {
      const orderList_ = await GlobalApi.getMyOrder(user.id, jwt);
      console.log('Order List:', orderList_);
      setOrderList(orderList_);
    } catch (error) {
      console.error('Error fetching orders:', error);
      router.replace('/'); 
    }
  };

  useEffect(() => {
    if (!loading && jwt && user) {
      getMyOrder();
    }
  }, [jwt, user, loading]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>My Order</h2>
      <div>
        <h2 className='text-3xl font-bold text-primary text-center mt-5'>Order History</h2>
        <div>
          {orderList.map((item, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger className='mx-auto block my-6 md:w-[50%] w-[90%] '>
                <div className='border p-2 bg-slate-100 flex justify-center gap-2 md:gap-16 items-center flex-col md:flex-row md:justify-evenly'>
                  <h2> 
                    <span className='font-bold mr-2'>Order Date:</span>
                    {moment(item?.createdAt).format('DD/MM/yyy')}
                  </h2>
                  <h2>
                    <span className='font-bold mr-2'>Total Amount:</span>
                    {item?.totalOrderAmount}
                  </h2>
                  <h2>
                    <span className='font-bold mr-2'>Status:</span>
                    {item?.status}
                  </h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {/* {item?.orderItemList?.length > 0 ? (
                  item?.orderItemList.map((orderItem, index_) => (
                    <MyOrderItem key={index_} orderItem={orderItem} />
                  ))
                ) : (
                  <p>No items found.</p>
                )} */}
                <MyOrderItem key={index} orderItem={item?.orderItemList} />
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrder;

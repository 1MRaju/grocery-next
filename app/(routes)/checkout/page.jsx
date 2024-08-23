'use client'
import { useCart } from '@/app/_context/UpdateCartContext'
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PayPalButtons } from '@paypal/react-paypal-js'
import { toast } from 'sonner';
import { ArrowBigRight } from 'lucide-react'

function Checkout() {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const { totalCartItem, updateCartItemCount, cartItemList } = useCart();
  const [cartItemLists, setCartItemLists] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState('');

  const router = useRouter();

  console.log(totalAmount);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
          setJwt(jwt);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error parsing user data from sessionStorage:', error);
      }
    };
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   if (user && jwt) {
  //     const getCartItems = async () => {
  //       try {
  //         const cartItemList1 = await GlobalApi.getCartItems(user.id, jwt);
  //         if (cartItemList1) {
  //           updateCartItemCount(cartItemList1.length);
  //           setCartItemLists(cartItemList1);
  //         }
  //       } catch (error) {
  //         console.error('Error fetching cart items:', error);
  //       }
  //     };
  //     getCartItems();
  //   }
  // }, [user, jwt, updateCartItemCount]);

  useEffect(() => {
    let total = cartItemList.reduce((acc, item) => acc + item.amount, 0);
    setSubTotal(total.toFixed(2));
  }, [cartItemList]);

  useEffect(() => {
    if (subtotal) {
      const tax = subtotal * 0.09;
      const deliveryFee = 50;
      setTotalAmount((parseFloat(subtotal) + tax + deliveryFee).toFixed(2));
    }
  }, [subtotal]);

  const onApprove = async (data) => {
    // console.log(data);
    const payload={
      data:{
        paymentid:(data.paymentId).toString(),
        totalOrderAmount:totalAmount,
        username:username,
        email: email,
        phone: phone,
        zip: zip,
        address:address,
        orderItemList:cartItemList,
        userid:user.id
      }
    }

    // GlobalApi.createOrder(payload, jwt).then(resp=>{
    //   // console.log(resp);
    //   toast('Order Placed Successfully!');
    //   cartItemList.forEach((item, index)=>{
    //     GlobalApi.deleteCartItem(item.id).then(resp=>{
         
    //     })
    //   })
    //   router.replace('/order-confirmation');
    // })

        // Create the order
        await GlobalApi.createOrder(payload, jwt);

        // Clear cart items
        await Promise.all(
          cartItemList.map(item => GlobalApi.deleteCartItem(item.id, jwt)) // Pass JWT token here
        );
    
        // Update cart items in the context
        // totalCartItem();
        updateCartItemCount();
    
        // Show success message and redirect
        toast('Order Placed Successfully!');
        router.replace('/order-confirmation');
  }

  return (
    <div>
      <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>Checkout</h2>
      <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 mb-5'>
        <div className='md:col-span-2 col-span-1 mx-20 my-5 '>
          <h2 className='font-bold text-3xl'>Billing Details</h2>
          <div className='grid md:grid-cols-2  col-span-1 gap-10 mt-3'>
            <Input placeholder='Name' value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='grid grid-cols-2 gap-10 mt-3'>
            <Input placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input placeholder='Zip' value={zip} onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className='mt-3'>
            <Input placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>
        <div className='mx-10 border'>
          <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart ({totalCartItem})</h2>
          <div>
            <h2 className='font-bold flex justify-between'>Subtotal: <span>Rs {subtotal}</span></h2>
            <hr />
            <h2 className='flex justify-between'>Delivery: <span>Rs 50.00</span></h2>
            <h2 className='flex justify-between'>Tax (9%): <span>Rs {(subtotal * 0.09).toFixed(2)}</span></h2>
            <hr />
            <h2 className='font-bold flex justify-between'>Total : <span>Rs {totalAmount}</span></h2>
            <Button 
            className='w-full'
            onClick={()=>onApprove({paymentId:123})}>Payment<ArrowBigRight/></Button>
            <PayPalButtons
            disabled={!(username&&email&&address&&zip)}
              style={{ layout: "horizontal" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code:'USD',
                        value: totalAmount
                      }
                    }
                  ]
                });
              }}
              // onApprove={async (data, actions) => {
              //   await actions.order.capture();
              //   // Handle successful payment here, e.g., update order status, notify user, etc.
              //   alert('Payment Successful!');
              //   router.push('/thank-you'); // Redirect to a thank you page or order summary
              // }}
              // onError={(err) => {
              //   console.error('PayPal Checkout Error:', err);
              //   alert('There was an error with the payment. Please try again.');
              // }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

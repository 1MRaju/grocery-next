"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import GlobalApi from '../_utils/GlobalApi';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  const updateCartItemCount = (count) => {
    console.log(count);
    setTotalCartItem(count);
  };

   // Fetch user and jwt from sessionStorage on mount
   useEffect(() => {
    const fetchUserData = () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        const jwt = sessionStorage.getItem('jwt');
        if (userData && jwt) {
          setUser(userData);
          setJwt(jwt);
        }
      } catch (error) {
        console.error('Error parsing user data from sessionStorage:', error);
      }
    };
    fetchUserData();
  }, []);

  const updateCartItems = async () => {
    if (!user || !jwt) return;

    try {
      const cartItems = await GlobalApi.getCartItems(user.id, jwt);
      setCartItemList(cartItems);
      updateCartItemCount(cartItems.length);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  // useEffect(() => {
  //   if (user && jwt) {
  //     updateCartItems();
  //   }
  // },[user, jwt]);

  return (
    <CartContext.Provider value={{ totalCartItem, cartItemList, updateCartItemCount, updateCartItems, jwt, user }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

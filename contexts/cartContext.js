"use client";

import { addProductToCart, deleteProductFromCart, getCart, updateProductQuantity } from "@/lib/services";
import { createContext, useState, useContext, useEffect } from "react";



const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function getCartItems() {
    getCart().then((data) => {
      setCartItems(data);
    setLoading(false);

    });
  }
  useEffect(() => {
    setLoading(true);
    getCartItems();
  }, []);



  const addToCart = async(product) => {

    await addProductToCart({productId:product.id,quantity:1})
    getCartItems();
  }

  const removeFromCart = (id) => {
    deleteProductFromCart(id)
    getCartItems();
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  const increaseQuantity = (id) => {
    updateProductQuantity({id:id,quantity:1})
    getCartItems();
  }

  const decreaseQuantity = (id) => {
    updateProductQuantity({id:id,quantity:-1})
    getCartItems();
  }
 

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartCount,increaseQuantity,decreaseQuantity ,loading}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

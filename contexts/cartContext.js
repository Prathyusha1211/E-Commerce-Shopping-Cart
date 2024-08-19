"use client";

import {
  addProductToCart,
  deleteProductFromCart,
  getCart,
  updateProductQuantity,
} from "@/lib/services";
import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function getCartItems() {
    getCart()
      .then((data) => {
        setCartItems(() => data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    setLoading(true);
    getCartItems();
  }, []);

  const addToCart = async (product) => {
    await addProductToCart({ productId: product.id, quantity: 1 });
    getCartItems();
  };

  const removeFromCart = async (id) => {
    const res = await deleteProductFromCart(id);
    if (res) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  const increaseQuantity = async (id) => {
    console.log("increasing quantity");

    const res = await updateProductQuantity({ id: id, quantity: 1 });
    console.log(res);
    if (res) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };

  const decreaseQuantity = async (id) => {
    const res = await updateProductQuantity({ id: id, quantity: -1 });
    if (res) {
      if (cartItems.find((item) => item.id === id).quantity === 1) {
        removeFromCart(id);
        return;
      }
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getCartCount,
        increaseQuantity,
        decreaseQuantity,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

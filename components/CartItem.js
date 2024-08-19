import { useCart } from "@/contexts/cartContext";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function CartItem({ item }) {
  const { decreaseQuantity, increaseQuantity, removeFromCart } = useCart();
  return (
    <div key={item.id} className="border p-4 rounded-md mb-4 flex">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-24 h-24 object-cover rounded mr-4"
      />
      <div className="flex-grow">
        <h2 className="text-lg font-medium">{item.name}</h2>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="mr-2 p-2 bg-gray-300 rounded-full"
          >
            <FaMinus className="font-extralight size-2" />
          </button>
          <input
            type="text"
            value={item.quantity}
            readOnly
            className="w-12 text-center border-t border-b"
          />
          <button
            onClick={() => {
              console.log("Increase Quantity clicked");
              increaseQuantity(item.id);
            }}
            className="ml-2 p-2 bg-gray-200 rounded-full"
          >
            <FaPlus className="size-2" />
          </button>
        </div>
        <button
          onClick={() => {
            console.log("Remove Item clicked");
            removeFromCart(item.id);
          }}
          className="text-red-500 hover:text-red-800 text-md mt-2"
        >
          Remove Item
        </button>
      </div>
    </div>
  );
}

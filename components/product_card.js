"use client";
import { useCart } from "@/contexts/cartContext";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const [bounce, setBounce] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    addToCart(product);
    setBounce(true);

    // Reset button state after a short delay
    setTimeout(() => {
      setIsClicked(false);
      setBounce(false);
    }, 500);
  };
  return (
    <div className="border p-5 rounded-md hover:shadow-lg transition-shadow duration-200 max-w-xs">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-36 object-contain mb-2 rounded"
      />
      <h2 className="text-md font-medium overflow-hidden whitespace-nowrap text-ellipsis ">
        {product.name}
      </h2>
      <p className="text-gray-600 text-xs overflow-hidden whitespace-nowrap text-ellipsis ">
        {product.description}
      </p>
      <div className="mt-1">
        <span className="text-md font-semibold text-black">
          ${product.price.toFixed(2)}
        </span>
        <span className="text-xs text-gray-500 line-through ml-2">$19.99</span>
        <span className="text-xs text-green-500 ml-2">10% off</span>
      </div>
      <button
        onClick={handleClick}
        className={`bg-blue-600 text-white mt-2 px-3 py-1.5 rounded w-full flex items-center justify-center transition-colors duration-300 ${
          isClicked ? "bg-gray-400" : "hover:bg-blue-700"
        }`}
      >
        <FaShoppingCart className={`mr-2 ${bounce ? "animate-bounce" : ""}`} />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

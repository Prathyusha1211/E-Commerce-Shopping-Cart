"use client";
import { useCart } from "@/contexts/cartContext";
import Link from "next/link";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

const Navbar = () => {
  const { getCartCount } = useCart();
  return (
  
    <nav className="bg-blue-600 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <a href="/">MyShop</a>
        </div>

        {/* Search Bar */}
        <div className="md:flex w-1/2 hidden ">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full px-4 py-2 rounded-l-md focus:outline-none"
          />
          <button className="bg-white  px-4 py-2 text-white rounded-r-md  flex items-center justify-center">
            <FaSearch className="text-blue-600"/>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4 text-white">
         
          <Link href="/products">

            Products
        
          </Link>
          <a href="#" className="hover:underline">
            Categories
          </a>
         <Link href="/cart" className="flex justify-center items-center">
            Cart
            <FaShoppingCart className="ml-2 relative" />
            {getCartCount() > 0 && <span className="bg-red-500 text-white py-1 px-2  rounded-full ml-2 absolute top-2 end-40 text-xs">{getCartCount()}</span>}
          </Link>
          <a href="#" className="hover:underline ">
            Account
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

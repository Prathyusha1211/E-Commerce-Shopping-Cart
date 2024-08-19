"use client";
import { useCart } from "@/contexts/cartContext";
import Link from "next/link";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import Logo from "../public/PngItem_31648.png";

const Navbar = () => {
  const { getCartCount } = useCart();
  return (
    <nav className="bg-blue-600 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <img
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
            alt="logo"
            className="w-auto h-8 inline-block"
          />
          <img
            src="https://seeklogo.com/images/F/flipkart-logo-3F33927DAA-seeklogo.com.png"
            alt="logo"
            className="w-5 h-5 inline-block"
          />
        </div>

        {/* Search Bar */}
        <div className="md:flex w-1/2 hidden ">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full px-4 py-2 rounded-l-md focus:outline-none"
          />
          <button className="bg-white  px-4 py-2 text-white rounded-r-md  flex items-center justify-center">
            <FaSearch className="text-blue-600" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4 text-white">
          <Link href="/">Products</Link>

          <Link
            href="/cart"
            className="relative flex justify-center items-center"
          >
            Cart
            <FaShoppingCart className="text-xl md:text-2xl" />{" "}
            {/* Adjust icon size for responsiveness */}
            {getCartCount() > 0 && (
              <span className="absolute -top-5 -right-4 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs md:text-sm font-bold rounded-full -translate-x-1/2 translate-y-1/2">
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

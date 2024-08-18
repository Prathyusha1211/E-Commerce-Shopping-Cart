// "use client";

// import CartItem from "@/components/CartItem";

// import { useCart } from "@/contexts/cartContext";


// const CartPage = () => {


//   const {cartItems,removeFromCart,increaseQuantity,decreaseQuantity, }=useCart();
//   {console.log(cartItems)}


  
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const discount = 5; // Example discount
//   const total = subtotal - discount;

//   return (
//     <>
   
//     <div className="bg-slate-100 container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Cart Items */}
//         <div className="flex-grow">
//           {cartItems.map(item => (
//            <CartItem key={item.id} item={item}  />
//           ))}
//         </div>

//         {/* Cart Summary */}
//         <div className="w-full lg:w-1/3 border p-4 rounded-md">
//           <h2 className="text-xl font-bold mb-4">Summary</h2>
//           <div className="flex justify-between mb-2">
//             <span>Subtotal</span>
//             <span>${subtotal.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between mb-2">
//             <span>Discount</span>
//             <span>-${discount.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between font-bold text-lg">
//             <span>Total</span>
//             <span>${total.toFixed(2)}</span>
//           </div>
//           <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default CartPage;

"use client";

import CartItem from "@/components/CartItem";
import { useCart } from "@/contexts/cartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = 5; // Example discount
  const total = subtotal - discount;

  return (
    <div className="bg-slate-50 container shadow-sm mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1> */}

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <img src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0=" alt="Empty Cart" className="w-1/4 h-1/4 mx-auto" />
          <p className="text-l font-semibold">Your cart is empty</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-grow">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-1/3 border p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;


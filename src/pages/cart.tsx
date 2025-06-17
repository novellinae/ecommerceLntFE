import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

const CartPage: React.FC = () => {
    const { cart, totalPrice, removeFromCart, updateQuantity } = useCart();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <Navbar />

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty. <Link href="/" className="text-blue-500 hover:underline">Start shopping!</Link></p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
                  <Image src={item.image} alt={item.title} width={100} height={100} className="object-contain mr-4" />
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1 bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4">
                <span>Total:</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <Link href="/checkout" className="block w-full text-center bg-green-500 text-white py-3 rounded-lg text-lg mt-6 hover:bg-green-600">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default CartPage;
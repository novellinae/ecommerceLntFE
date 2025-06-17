import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import {  useState } from "react";
import { useRouter } from "next/router";

const CheckoutPage: React.FC = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' |'success'| 'failed'>('idle');
    
    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            router.push('/');
            return;
        }
        setPaymentStatus('processing');
        
        setTimeout(() => {
            const success = Math.random() > 0.1;
            if (success){
                setPaymentStatus('success');
                clearCart();
                alert("Payment successful! Thank you for your purchase.");
                router.push('/');
            } else{
                setPaymentStatus('idle');
                alert("Payment failed. Please try again.");
            }
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <Head>
                <title>Checkout</title>
            </Head>
            <Navbar />

            <main className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Checkout
                </h1>
                {cart.length === 0 ? (
                    <p className="text-center text-lg">Your cart is empty. </p>
                ) : (
                    <div className="max-w-xl mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                        <ul className="space-y-4">
                            {cart.map((item) => (
                                <li key={item.id} className="flex justify-between items-center">
                                    <span>{item.title} (x{item.quantity})</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4">
                            <span>Total to Pay:</span>
                            <span>${totalPrice().toFixed(2)}</span>
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-500">By clicking Pay Now, you agree to our terms and conditions.</p>
                        <button
                onClick={handleCheckout}
                disabled={paymentStatus === 'processing'}
                className={`w-full py-3 rounded-lg text-lg ${
                  paymentStatus === 'processing'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {paymentStatus === 'processing' ? 'Processing Payment...' : 'Complete Purchase'}
              </button>
              {paymentStatus === 'failed' && (
                <p className="text-red-500 text-center mt-2">Payment failed. Please try again.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default CheckoutPage;
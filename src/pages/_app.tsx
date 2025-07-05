import type { AppProps } from "next/app";
import '../styles/globals.css';
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ProductProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}


// This is the main entry point for the Next.js application.
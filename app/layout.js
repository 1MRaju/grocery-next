
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "./_context/UpdateCartContext"
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalProvider from "./_components/PayPalProvider";

const outfit = Outfit({ subsets: ["latin"] });



export const metadata = {
  title: "My Grocery Store",
  description: "Generated Grocery store by create next app",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link
        rel="icon"
        href="/favicon.png"
        type="image/png"
        sizes="50*50"
      />
      </head>
      <body className={outfit.className}>
      <PayPalProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID  }}>
        <CartProvider>
            <Header/>
            {children}
            <Toaster />
            <Footer/>
        </CartProvider>
    </PayPalProvider>
      </body>
    </html>
  );
}

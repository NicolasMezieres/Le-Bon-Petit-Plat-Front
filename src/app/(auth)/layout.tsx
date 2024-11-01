"use client";
import type { Metadata } from "next";
import "../globals.css";
import HeaderAuth from "@/components/header/HeaderAuth";
import Footer from "@/components/footer/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextLoading } from "@/context/context";
import { useEffect, useState } from "react";
import FoodLoader from "@/components/loader/FoodLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoad(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <html lang="fr">
      <head>
        <script src="https://www.google.com/recaptcha/api.js?hl=fr" async defer></script>
      </head>
      <body>
        {isLoad ? (
          <div className="fixed top-20 right-20">
            <FoodLoader />
          </div>
        ) : (
          <div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
            <HeaderAuth />
            {isLoading && <FoodLoader />}
            <ContextLoading.Provider value={{ isLoading, setIsLoading }}>
              {children}
            </ContextLoading.Provider>
            <Footer />
          </div>
        )}
      </body>
    </html>
  );
}

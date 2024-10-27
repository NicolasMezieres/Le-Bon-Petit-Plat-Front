"use client";
import "../globals.css";
import Footer from "@/components/footer/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextLoading } from "@/context/context";
import { useEffect, useState } from "react";
import FoodLoader from "@/components/loader/FoodLoader";
import Header from "@/components/header/Header";
import { jwtDecode } from "jwt-decode";
import { tokenType } from "@/utils/type";

// export const metadata: Metadata = {
//   title: "Le Bon Petit Plat",
//   description: "Le bon petit plat est un site de partage de recette de cuisine.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [tokenInfo, setTokenInfo] = useState<tokenType>();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      try {
        const jwt: tokenType = jwtDecode(token);
        setTokenInfo(jwt);
      } catch (error) {}
    }
    setIsLoad(false);
  }, []);
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
        />
        <script src="https://www.google.com/recaptcha/api.js?hl=fr" async defer></script>
      </head>
      <body className="font-['Lato']">
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
            <ContextLoading.Provider value={{ isLoading, setIsLoading, tokenInfo, setTokenInfo }}>
              <Header />
              {isLoading && (
                <div className="fixed top-20 md:top-40">
                  <FoodLoader />
                </div>
              )}
              {children}
            </ContextLoading.Provider>
            <Footer />
          </div>
        )}
      </body>
    </html>
  );
}

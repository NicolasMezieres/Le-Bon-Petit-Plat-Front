import type { Metadata } from "next";
import "../globals.css";
import HeaderAuth from "@/components/header/HeaderAuth";
import Footer from "@/components/footer/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Le Bon Petit Plat",
  description: "Le bon petit plat est un site de partage de recette de cuisine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script src="https://www.google.com/recaptcha/api.js?hl=fr" async defer></script>
      </head>
      <body className="font-['Lato']">
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
        {children}
        <Footer />
      </body>
    </html>
  );
}

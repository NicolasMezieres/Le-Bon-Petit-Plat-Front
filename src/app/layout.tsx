import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import HeaderAuth from "@/components/header/HeaderAuth";

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
        <meta
          name="description"
          content="Page d'accueil afin de présenter le site le Bon Petit Plat, un endroit ou l'on peut partager ces recettes ou par manque d'idée en rechercher"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col font-['lato'] ">{children}</body>
    </html>
  );
}

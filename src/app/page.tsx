import Footer from "@/components/footer/Footer";
import HeaderAuth from "@/components/header/HeaderAuth";
import Image from "next/image";

export default function Home() {
  return (
    <main className="grow">
      <div>
        <div className="absolute w-full">
          <HeaderAuth />
        </div>
        <div className="h-screen">
          <div className="bgImageDescription top-0  h-full w-screen"></div>
          <div className="relative pt-4 md:pt-20 z-10 text-center h-full md:text-xl lg:text-2xl flex gap-y-5 justify-center flex-col px-4 md:px-8">
            <p className="text-center">Bienvenue sur le bon petit plat</p>
            <p>Vous ne savez pas quoi préparer pour le dîner ?</p>
            <p>
              Découvrez une multitude de recettes adaptées aux ingrédients que vous avez à
              disposition.
            </p>
            <p>
              Vous pouvez également partager vos propres recettes et évaluer celles publiées par
              d'autres utilisateurs.
            </p>
            <p>
              Retrouver toutes nos recettes
              <a className="orange" href="./accueil">
                {" ici"}
              </a>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}

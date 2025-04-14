import Footer from "@/components/footer/Footer";
import InputForm from "@/components/form/InputForm";
import HeaderAuth from "@/components/header/HeaderAuth";
import MainTitle from "@/components/MainTitle";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="bgImageDescription before:block">
        <HeaderAuth />
        <main className="grow pb-5">
          <InputForm type="text" placeholder="test" textLabel="test" />
          <div className="relative pt-4 md:pt-20 z-10 text-center h-full md:text-xl lg:text-2xl flex gap-y-20 flex-col px-4 md:px-8 xl:px-20">
            <MainTitle text="Bienvenue sur le bon petit plat" />
            <section className="flex items-center">
              <p className="md:px-10">
                Vous ne savez pas quoi préparer pour le dîner ?<br />
                <br className="hidden md:block" /> Découvrez une multitude de recettes adaptées aux
                ingrédients que vous avez à disposition.
              </p>
              <Image
                width={500}
                height={500}
                alt="Image de présentation d'ingrédient"
                src={"/IngrédientAccueil.jpg"}
                className="w-32 h-32 md:w-60 md:h-52 object-cover rounded-3xl"
              />
            </section>
            <section className="flex items-center">
              <Image
                width={500}
                height={500}
                alt="Image représentant le partage de recette"
                src={"/partageRecette.webp"}
                className="w-32 h-32 md:w-60 md:h-52 object-cover rounded-3xl"
              />
              <p className="md:px-10">
                Vous pouvez également partager vos propres recettes et évaluer celles publiées par
                d&apos;autres utilisateurs.
              </p>
            </section>
            <p>
              Retrouver toutes nos recettes
              <a className="orange font-bold" href="./accueil">
                {" ici"}
              </a>
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

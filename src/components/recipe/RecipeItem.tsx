import { ContextLoading } from "@/context/context";
import { deleteRecipe } from "@/Service/recipe";
import { imagePath } from "@/utils/const";
import { lookRecipeType } from "@/utils/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { FaHeart, FaRegStar, FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import ThirdTitle from "../ThirdTitle";
import { MdOutlineAccessTime } from "react-icons/md";
import { PiChefHat } from "react-icons/pi";
import { toggleFavori } from "@/Service/favori";

const RecipeItem = ({ Element, isFavori }: { Element: lookRecipeType; isFavori?: boolean }) => {
  const { push } = useRouter();
  const { tokenInfo, setIsLoading } = useContext(ContextLoading);
  function removeRecipe(id: string) {
    deleteRecipe(id).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        setIsLoading(true);
      } else if (res.status === 401) {
        window.localStorage.removeItem("token");
        push("/signin");
      }
    });
  }
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.round(parseFloat(Element.note))) {
      stars.push(<FaStar color="#DE742E" className="w-6 h-6" key={i} />);
    } else {
      stars.push(<FaRegStar color="#DE742E" className="w-6 h-6" key={i} />);
    }
  }
  const duration = [
    Element.cookingTime?.split(":"),
    Element.standingTime?.split(":"),
    Element.preparationTime.split(":"),
  ];
  let totalTime = 0;
  duration.map((Element) => {
    if (Element && Element[0]) {
      Element[0] = String(parseInt(Element[0]) * 60);
    }
    Element?.map((time) => {
      totalTime += Number(time);
    });
  });
  const newTime = String(Math.floor(totalTime / 60)) + ":" + String(totalTime % 60);
  function toggleFav() {
    toggleFavori(Element.id).then((res) => {
      if (res.status === 200) {
        setIsLoading(true);
      }
    });
  }
  return (
    <article className="relative w-[300px] mx-auto justify-self-center flex md:mx-0 pt-8 pb-5 bg-[#EAEAEA] borderOrange border-2 rounded-[20px]">
      {Element.idUser === tokenInfo?.sub && (
        <IoClose
          className="absolute top-4 right-4 w-6 h-6 orange"
          onClick={() => removeRecipe(Element.id)}
        />
      )}
      <div className="mx-auto flex flex-col items-center gap-4">
        <Image
          width={500}
          height={500}
          src={imagePath + Element.picture}
          alt={`picture's ${Element.title}`}
          priority={true}
          className="w-20 h-20 rounded-3xl md:w-28 md:h-28 object-cover"
        />
        <div className="flex">
          {stars &&
            stars.map((Element) => {
              return Element;
            })}
        </div>
        <p>{Element.numberNote} avis</p>
        {isFavori && (
          <div className="flex justify-center gap-1" onClick={() => toggleFav()}>
            <FaHeart color="#DE742E" className="w-6 h-6" /> <p>Favori</p>
          </div>
        )}
      </div>
      <div className="mx-auto flex flex-col items-center justify-between">
        <ThirdTitle size="text-base" text={Element.title} />
        <div className="flex w-full justify-between">
          <div className="flex flex-col items-center">
            <MdOutlineAccessTime color="#DE742E" className="w-10 h-10" />
            <p className="text-center">{newTime}</p>
          </div>
          <div className="flex flex-col items-center justify-center relative">
            <PiChefHat color="#DE742E" className="w-10 h-10" />
            <p className="text-center">
              {Element.difficulty === 1
                ? "Facile"
                : Element.difficulty === 2
                ? "Intermédiaire"
                : "Difficile"}
            </p>
          </div>
        </div>
        <button
          onClick={() => push(`/recipe/${Element.id}`)}
          className="bg-[#DE742E] text-[#f2f2f2] w-32 h-7 rounded-[20px]"
        >
          Voir la recette
        </button>
      </div>
    </article>
  );
};

export default RecipeItem;

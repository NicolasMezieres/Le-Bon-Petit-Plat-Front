"use client";
import FoodLoader from "@/components/loader/FoodLoader";
import CommentaryCreate from "@/components/modal/CommentaryCreate";
import SecondTitle from "@/components/SecondTitle";
import ThirdTitle from "@/components/ThirdTitle";
import { ContextLoading } from "@/context/context";
import { isFavoriteRecipe, toggleFavori } from "@/Service/favori";
import { findRecipeById } from "@/Service/recipe";
import { imagePath } from "@/utils/const";
import { commentaryType, lookRecipeType } from "@/utils/type";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaHeart, FaRegEdit, FaRegStar, FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { MdDelete, MdOutlineAccessTime } from "react-icons/md";
import { PiChefHat, PiKeyReturn } from "react-icons/pi";

const Page = ({ params }: { params: { id: string } }) => {
  const { setIsLoading, isLoading, tokenInfo, setTokenInfo } = useContext(ContextLoading);
  const [commentaryList, setCommentaryList] = useState<commentaryType[]>([]);
  const [recipeInfo, setRecipeInfo] = useState<lookRecipeType>();
  const [isFavorite, setIsFavorite] = useState<boolean>();
  const [piece, setPiece] = useState<number>();
  useEffect(() => {
    findRecipeById(params.id).then((res) => {
      console.log(res);
      if (res?.status === 200) {
        setRecipeInfo(res.data.data);
        setCommentaryList(res.data.commentary);
        setPiece(res.data.data.piece);
        if (tokenInfo) {
          isFavoriteRecipe(params.id).then((res) => {
            if (res.status === 200) {
              setIsFavorite(res.data);
            } else if (res.status === 401) {
              if (setTokenInfo) {
                setTokenInfo(undefined);
                window.localStorage.removeItem("token");
              }
            }
          });
        }
      }
    });
    setIsLoading(false);
  }, [isLoading]);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (recipeInfo && i < Number(recipeInfo.note)) {
      stars.push(<FaStar color="#DE742E" className="w-6 h-6" key={i} />);
    } else {
      stars.push(<FaRegStar color="#DE742E" className="w-6 h-6" key={i} />);
    }
  }
  const duration = [
    recipeInfo?.cookingTime?.split(":"),
    recipeInfo?.standingTime?.split(":"),
    recipeInfo?.preparationTime.split(":"),
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
    toggleFavori(params.id).then((res) => {
      console.log(res);
      if (res.status === 201) {
        setIsFavorite((prev) => !prev);
      }
    });
  }
  if (isLoading) {
    return <FoodLoader />;
  }
  if (recipeInfo)
    return (
      <main className="grow relative py-5 px-6 md:px-20">
        <PiKeyReturn color="#DE742E" className="w-9 h-8 absolute" />
        <div className="flex flex-col gap-4 xl:w-full">
          <SecondTitle text={recipeInfo.title} />
          <Image
            width={1000}
            height={1000}
            src={imagePath + recipeInfo.picture}
            alt={`Picture's ${recipeInfo.title}`}
            className="rounded-3xl h-64 md:w-96 xl:w-1/2 xl:h-2/3 self-center object-cover"
          />
          <div className="flex justify-center">
            {stars &&
              stars.map((Element) => {
                return Element;
              })}
          </div>
          <p className="text-center">{recipeInfo.numberNote} avis</p>
          <div className="flex justify-center gap-20">
            <div className="flex flex-col items-center">
              <MdOutlineAccessTime color="#DE742E" className="w-10 h-10" />
              <p>{newTime}</p>
            </div>
            <div className="flex flex-col items-center relative">
              <PiChefHat color="#DE742E" className="w-10 h-10" />
              <p className="absolute bottom-0">
                {recipeInfo.difficulty === 1
                  ? "Facile"
                  : recipeInfo.difficulty === 2
                  ? "Intermédiaire"
                  : "Difficile"}
              </p>
            </div>
          </div>
          {tokenInfo && (
            <div className="flex justify-center gap-1" onClick={() => toggleFav()}>
              {isFavorite ? (
                <>
                  <FaHeart color="#DE742E" className="w-6 h-6" /> <p>Favori</p>
                </>
              ) : (
                <>
                  <FaRegHeart color="#DE742E" className="w-6 h-6" /> <p>Favori</p>
                </>
              )}
            </div>
          )}
          {tokenInfo && tokenInfo.sub === recipeInfo.idUser && (
            <div className="flex justify-center gap-20">
              <FaRegEdit color="#DE742E" className="w-10 h-10" />
              <MdDelete color="#DE742E" className="w-10 h-10" />
            </div>
          )}
          <ThirdTitle
            text="Ingrédients"
            size="text-base md:text-xl xl:text-2xl"
            additionalCSS=" grid grid-cols-3  before:content-[''] inline before:border-[1px] before:border-[#212121] before:block before:self-center before:h-[1px] after:border-[1px] after:border-[#212121] after:block after:self-center after:h-[1px] "
          />
          <div className="flex justify-center gap-4 items-center">
            {piece && piece > 1 && (
              <FaArrowLeft
                color="#DE742E"
                className="w-4 h-4"
                onClick={() => setPiece((prev) => (prev ? prev - 1 : undefined))}
              />
            )}
            <p>{piece} personnes</p>
            {piece && piece < 50 && (
              <FaArrowRight
                color="#DE742E"
                className="w-4 h-4"
                onClick={() => setPiece((prev) => (prev ? prev + 1 : undefined))}
              />
            )}
          </div>
          <section className="flex flex-col md:items-center ">
            <div className="flex flex-col items-start gap-4">
              {recipeInfo.ingredient.map((Element, index) => {
                return (
                  <div className="flex justify-start gap-2.5" key={index}>
                    <input type="checkbox" className="w-6 h-6" />
                    <p>
                      {piece
                        ? ((Element.quantity / recipeInfo.piece) * piece).toFixed(2) + " "
                        : Element.quantity + " "}
                      {Element.unit} {Element.ingredient}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
          <ThirdTitle
            text="Préparation"
            size="text-base md:text-xl xl:text-2xl"
            additionalCSS=" grid grid-cols-3  before:content-[''] inline before:border-[1px] before:border-[#212121] before:block before:self-center before:h-[1px] after:border-[1px] after:border-[#212121] after:block after:self-center after:h-[1px] "
          />
          <section className="flex flex-col md:items-center">
            <div className="flex flex-col items-center gap-4">
              {recipeInfo.cookingStep.map((Element, index) => {
                return (
                  <div className="flex flex-col gap-2.5" key={index}>
                    <p>Étape {index + 1}</p>
                    <p>{Element.step}</p>
                  </div>
                );
              })}
            </div>
          </section>
          <div className="shadow-[0_0_2px_#212121] w-full md:w-80 rounded-3xl py-4 flex flex-col self-center gap-4">
            <ThirdTitle
              text="La recette est terminer"
              size="text-base md:text-xl xl:text-2xl"
              additionalCSS="text-[#DE742E]"
            />
            <CommentaryCreate id={recipeInfo.id} />
          </div>
          <ThirdTitle
            text="Commentaires"
            size="text-base md:text-xl xl:text-2xl"
            additionalCSS=" grid grid-cols-3  before:content-[''] inline before:border-[1px] before:border-[#212121] before:block before:self-center before:h-[1px] after:border-[1px] after:border-[#212121] after:block after:self-center after:h-[1px] "
          />
          {commentaryList && (
            <section className="w-full md:w-80 self-center">
              {commentaryList.length > 0 &&
                commentaryList.map((Element, index) => {
                  const stars = [];
                  for (let i = 0; i < 5; i++) {
                    if (i < Element.note) {
                      stars.push(<FaStar color="#DE742E" className="w-6 h-6" key={i} />);
                    } else {
                      stars.push(<FaRegStar color="#DE742E" className="w-6 h-6" key={i} />);
                    }
                  }
                  const date = new Date(Element.createdAt);
                  return (
                    <div className="shadow-[0_0_2px_#212121] p-4 rounded-3xl" key={index}>
                      <p className="text-[#DE742E]">{Element.username}</p>
                      <div className="flex">{stars}</div>
                      <p>{Element.text}</p>
                      <p className="text-[#888]">{date.toLocaleDateString("fr")}</p>
                    </div>
                  );
                })}
            </section>
          )}
        </div>
      </main>
    );
};

export default Page;

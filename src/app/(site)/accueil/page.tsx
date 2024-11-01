"use client";
import Category from "@/components/category/Category";
import ListRecipes from "@/components/recipe/ListRecipes";
import RecipeItem from "@/components/recipe/RecipeItem";
import SearchBar from "@/components/SearchBar";
import SearchNotation from "@/components/SearchNotation";
import SecondTitle from "@/components/SecondTitle";
import ThirdTitle from "@/components/ThirdTitle";
import { ContextLoading } from "@/context/context";
import { bestRated, mostRecent, search } from "@/Service/recipe";
import { settings } from "@/utils/const";
import { lookRecipeType } from "@/utils/type";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
const Page = () => {
  const { isLoading, setIsLoading } = useContext(ContextLoading);
  const { push } = useRouter();
  const [research, setResearch] = useState<string>();
  const [page, setPage] = useState<number>(0);
  const [selectNote, setSelectNote] = useState<number>(0);
  const [starSelected, setStarSelected] = useState<React.JSX.Element[]>();
  const [valueCategory, setValueCategory] = useState<string>();
  const [selectCategory, setSelectCategory] = useState<number | undefined>(0);
  const [listRecipes, setListRecipes] = useState<lookRecipeType[]>([]);
  const [bestRatedRecipes, setBestRatedRecipes] = useState<lookRecipeType[]>([]);
  const [mostRecentRecipes, setMostRecentRecipes] = useState<lookRecipeType[]>([]);
  const [isNextPage, setIsNextPage] = useState<boolean>(false);
  useEffect(() => {
    if (!research && !valueCategory && selectNote === 0) {
      bestRated().then((res) => {
        if (res?.status === 200) {
          setBestRatedRecipes(res.data.data);
          setListRecipes([]);
        }
      });
      mostRecent().then((res) => {
        if (res?.status === 200) {
          setMostRecentRecipes(res.data.data);
          setListRecipes([]);
        }
      });
    } else {
      search(valueCategory, research, page, selectNote).then((res) => {
        console.log(res);
        if (res?.status === 200) {
          setListRecipes(res.data.data);
          setIsNextPage(res.data.isNextPage);
        } else if (res?.status === 401) {
          window.localStorage.removeItem("token");
          push("/signin");
        }
      });
    }
    setIsLoading(false);
  }, [research, page, isLoading, valueCategory, selectNote]);
  return (
    <main className="grow py-4 flex flex-col gap-4 md:px-20">
      <SearchBar setPage={setPage} setSearch={setResearch} search={research} />
      <SearchNotation
        selectNote={selectNote}
        setSelectNote={setSelectNote}
        setStarSelected={setStarSelected}
        starSelected={starSelected}
      />
      <ThirdTitle additionalCSS="md:text-[28px]" text="Les catégories" />
      <Category
        valueCategory={valueCategory}
        setValueCategory={setValueCategory}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
      />
      {listRecipes && listRecipes.length > 0 ? (
        <ListRecipes
          listRecipes={listRecipes}
          isNextPage={isNextPage}
          page={page}
          setPage={setPage}
        />
      ) : listRecipes && listRecipes.length === 0 && (research || valueCategory || selectNote) ? (
        <SecondTitle text="Aucune recette trouvée" />
      ) : (
        <div>
          {bestRatedRecipes.length > 0 && (
            <div>
              <ThirdTitle text="Les recettes les mieux notées" />
              <div className="pb-10">
                <Slider {...settings}>
                  {bestRatedRecipes &&
                    bestRatedRecipes.map((Element, index) => {
                      return <RecipeItem Element={Element} key={index} />;
                    })}
                </Slider>
              </div>
            </div>
          )}
          {mostRecentRecipes.length > 0 && (
            <div>
              <ThirdTitle text="Les dernières recettes" />
              <div className="pb-10">
                <Slider {...settings} className="flex flex-col md:gap-4 md:grid">
                  {mostRecentRecipes &&
                    mostRecentRecipes.map((Element, index) => {
                      return <RecipeItem Element={Element} key={index} />;
                    })}
                </Slider>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Page;

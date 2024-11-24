"use client";
import Category from "@/components/category/Category";
import FoodLoader from "@/components/loader/FoodLoader";
import ListRecipes from "@/components/recipe/ListRecipes";
import SearchBar from "@/components/SearchBar";
import SearchNotation from "@/components/SearchNotation";
import ThirdTitle from "@/components/ThirdTitle";
import { ContextLoading } from "@/context/context";
import { myRecipes, searchMyRecipes } from "@/Service/recipe";
import { lookRecipeType } from "@/utils/type";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const { push } = useRouter();
  const { isLoading, setIsLoading } = useContext(ContextLoading);
  const [search, setSearch] = useState<string>();
  const [page, setPage] = useState<number>(0);
  const [listRecipes, setListRecipes] = useState<lookRecipeType[]>([]);
  const [isNextPage, setIsNextPage] = useState<boolean>(false);
  const [selectCategory, setSelectCategory] = useState<number | undefined>(0);
  const [selectNote, setSelectNote] = useState<number>(0);
  const [starSelected, setStarSelected] = useState<React.JSX.Element[]>();
  const [valueCategory, setValueCategory] = useState<string>();
  useEffect(() => {
    if (!search && !valueCategory && selectNote === 0) {
      myRecipes(page).then((res) => {
        if (res.status === 200) {
          setListRecipes(res.data.data);
          setIsNextPage(res.data.isNextPage);
        } else if (res.status === 401) {
          window.localStorage.removeItem("token");
          push("/signin");
        }
      });
    } else {
      searchMyRecipes(valueCategory, search, page, selectNote).then((res) => {
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
  }, [search, page, isLoading, valueCategory, selectNote]);
  if (isLoading) {
    <FoodLoader />;
  }
  return (
    <main className="grow py-4 flex flex-col gap-4 md:px-20">
      <SearchBar setPage={setPage} setSearch={setSearch} search={search} />
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
      <ListRecipes
        listRecipes={listRecipes}
        isNextPage={isNextPage}
        page={page}
        setPage={setPage}
      />
    </main>
  );
};

export default Page;

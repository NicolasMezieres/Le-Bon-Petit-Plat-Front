import React from "react";
import Pagination from "../Pagination";
import { lookRecipeType } from "@/utils/type";
import RecipeItem from "./RecipeItem";

const ListRecipes = ({
  listRecipes,
  isNextPage,
  page,
  setPage,
  isFavoris,
}: {
  listRecipes: lookRecipeType[];
  isNextPage: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isFavoris?: boolean;
}) => {
  return (
    <section className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-y-5 md:gap-x-2 xl:grid-cols-3 xl:gap-5 ">
      {listRecipes &&
        listRecipes.map((Element, index) => {
          return <RecipeItem isFavori={isFavoris} Element={Element} key={index} />;
        })}
      <Pagination
        additionalCSSDiv="md:col-span-2 xl:col-span-3"
        isNextPage={isNextPage}
        page={page}
        setPage={setPage}
      />
    </section>
  );
};

export default ListRecipes;

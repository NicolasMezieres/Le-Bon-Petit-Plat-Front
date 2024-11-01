import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Pagination from "../Pagination";
import { lookRecipeType } from "@/utils/type";
import { ContextLoading } from "@/context/context";
import { deleteRecipe } from "@/Service/recipe";
import { toast } from "react-toastify";
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
  //todo rajouter la favoris en fonction de isFavoris
}) => {
  const { tokenInfo, setIsLoading } = useContext(ContextLoading);
  const { push } = useRouter();
  function removeRecipe(id: string) {
    deleteRecipe(id).then((res) => {
      console.log(res);
      if (res.status === 200) {
        toast.success(res.data.message);
        setIsLoading(true);
      } else if (res.status === 401) {
        window.localStorage.removeItem("token");
        push("/signin");
      }
    });
  }

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

import axios from "axios";
import { axiosConfigWithToken } from "./category";
import { toast } from "react-toastify";
import { axiosConfig } from "./auth";
import { recipeType } from "@/utils/type";
const recipe = "recipe/";

export async function getAllRecipe(page?: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${recipe}?page=${page}`;
  return axios
    .get(url, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function myRecipes(page?: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${recipe}user?page=${page}`;
  return axios
    .get(url, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function bestRated() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${recipe}bestRated`;
  return axios
    .get(url, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function mostRecent() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${recipe}mostRecent`;
  return axios
    .get(url, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function search(idCategory: string, search: string, page?: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${recipe}search?idCategory=${idCategory}&search=${
    search ? search : ""
  }&page=${page ? page : ""}`;
  return axios
    .get(url, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function findRecipeById(id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${recipe}${id}`;
  return axios
    .get(url, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function createRecipe(data: recipeType) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${recipe}`;
  return axios
    .post(url, data, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function updateRecipe(data: recipeType, id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${recipe}${id}`;
  return axios
    .patch(url, data, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function deleteRecipe(id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${recipe}${id}`;
  return axios
    .delete(url, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

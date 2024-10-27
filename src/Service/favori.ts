import axios from "axios";
import { axiosConfigWithToken } from "./category";
import { toast } from "react-toastify";
const favori = "favori/";
export async function getFavoris(page?: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${favori}?page=${page}`;
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  return axios
    .get(url, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      if (e.status === 401 && e.response.data.message === "Unauthorized") {
        toast.error("Vous n'êtes pas autorisé");
        return e;
      } else {
        toast.error(e.response.data.message);
      }
    });
}

export async function toggleFavori(idRecipe: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${favori}`;
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  return axios
    .post(url, { idRecipe: idRecipe }, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      if (e.status === 401 && e.response.data.message === "Unauthorized") {
        toast.error("Vous n'êtes pas autorisé");
        return e;
      } else {
        toast.error(e.response.data.message);
        return e;
      }
    });
}

export async function isFavoriteRecipe(id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${favori}${id}`;
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  return axios
    .get(url, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
}

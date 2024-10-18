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
      toast.error(e.response.data.message);
    });
}

export async function toggleFavori(idRecipe: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${favori}`;
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  return axios
    .post(url, idRecipe, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

import axios from "axios";
import { axiosConfigWithToken } from "./category";
import { toast } from "react-toastify";
const favori = "favori/";
export async function getFavoris(page?: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${favori}?page=${page}`;
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
  return axios
    .post(url, idRecipe, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

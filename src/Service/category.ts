import axios from "axios";
import { toast } from "react-toastify";
export const axiosConfigWithToken = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "content-type": "application/json;charset=utf-8",
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  },
};
const category = "category/";

export async function getAllCategories() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${category}`;
  return axios
    .get(url, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function createCategory(name: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${category}`;
  return axios
    .post(url, name, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function updateCategory(name: string, id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${category}${id}`;
  return axios
    .patch(url, name, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function deleteCategory(id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${category}${id}`;
  return axios
    .delete(url, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

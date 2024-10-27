import axios from "axios";
import { axiosConfigWithToken } from "./category";
import { toast } from "react-toastify";
import { commentaryFormType } from "@/utils/type";
import { axiosConfig } from "./auth";
const commentary = "commentary/";

export async function createCommentary(data: commentaryFormType) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${commentary}`;
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  return axios
    .post(url, data, axiosConfigWithToken)
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

export async function getMyCommentaries() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${commentary}myCommentaries`;
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

export async function getCommentariesByRecipe(id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${commentary}recipe/${id}`;
  return axios
    .get(url, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function updateCommentary(data: commentaryFormType, id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${commentary}/${id}`;
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  return axios
    .patch(url, data, axiosConfigWithToken)
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

export async function deleteCommentary(id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${commentary}/${id}`;
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  return axios
    .delete(url, axiosConfigWithToken)
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

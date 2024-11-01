import axios from "axios";
import { axiosConfigWithToken } from "./category";
import { toast } from "react-toastify";
import { updateMyInfoType, userListType } from "@/utils/type";
const user = "user/";
export async function allUser(page?: number) {
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}${user}?page=${page}`;
  return axios
    .get(url, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
      return e;
    });
}
export async function searchUser(search: string, page?: number) {
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}${user}search?page=${page}&search=${search}`;
  return axios
    .get(url, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
      return e;
    });
}
export async function myInfo() {
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}${user}myInfo`;
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
export async function updateUser(data: updateMyInfoType) {
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}${user}update`;
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

export async function updateUserByAdmin(data: userListType, id: string) {
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}${user}update/${id}`;
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

export async function deleteUser(id: string) {
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}${user}${id}`;
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

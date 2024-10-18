import axios from "axios";
import { axiosConfigWithToken } from "./category";
import { toast } from "react-toastify";
import { signUpType, updateUserByAdminType } from "@/utils/type";
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
    });
}

export async function updateUser(data: signUpType) {
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}${user}update`;
  return axios
    .patch(url, data, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function updateUserByAdmin(data: updateUserByAdminType, id: string) {
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}${user}update/${id}`;
  return axios
    .patch(url, data, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
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
      toast.error(e.response.data.message);
    });
}

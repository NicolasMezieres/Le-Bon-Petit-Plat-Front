import axios from "axios";
import { toast } from "react-toastify";

export async function uploadImage(file: FileList) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}image`;
  const axiosConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  const formdata = new FormData();
  formdata.append("image", file[0]);
  return axios
    .post(url, formdata, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

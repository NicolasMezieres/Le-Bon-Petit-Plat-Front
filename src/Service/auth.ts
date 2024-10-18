import { signInType, signUpType } from "@/utils/type";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosConfigWithToken } from "./category";
const auth = "auth/";
export const axiosConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "content-type": "application/json;charset=utf-8",
  },
};
export async function Signup(data: signUpType) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${auth}signup`;
  return axios
    .post(url, data, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log(e);
      if (e.status === 400) {
        toast.error(e.response.data.message[0]);
      } else {
        toast.error(e.response.data.message);
      }
    });
}

export async function Signin(data: signInType) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${auth}signin`;
  return axios
    .post(url, data, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function isUsedIdentifier(identifier: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${auth}isUsed?identifier=${identifier}`;
  return axios
    .get(url, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log(e);
      toast.error(e.response.data.message);
      return e;
    });
}

export async function requestResetPassword(email: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${auth}requestResetPassword`;
  return axios
    .post(url, email, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function resetPassword(password: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${auth}resetPassword`;
  axiosConfigWithToken.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  return axios
    .post(url, password, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

export async function reCaptcha(
  executeRecaptcha: (action?: string) => Promise<string>,
  submitStatus: string,
  setSubmitStatus: React.Dispatch<React.SetStateAction<string>>
) {
  const gRecaptchaToken = await executeRecaptcha("registerSubmit");
  try {
    const response = await axios.post(
      "/api/recaptchaVerify",
      {
        gRecaptchaToken,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      console.log(`Registration success with score: ${response.data.score}`);
      setSubmitStatus("Registration Successful. Welcome!");
    } else {
      console.error(`Registration failure with score: ${response.data.score}`);
      setSubmitStatus("Registration Failed. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    setSubmitStatus("An error occurred. Please try again.");
  }
}

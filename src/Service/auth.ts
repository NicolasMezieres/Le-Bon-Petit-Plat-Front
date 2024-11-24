"use client";
import { resetPasswordType, signInType, signUpType } from "@/utils/type";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosConfigWithToken } from "./category";
const auth = "auth/";
export const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=utf-8",
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
      toast.error(e.response.data.message);
      return e;
    });
}

export async function requestResetPassword(email: { email: string }) {
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

export async function resetPassword(password: resetPasswordType, token?: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${auth}resetPassword`;
  axiosConfigWithToken.headers.Authorization = `Bearer ${token}`;
  return axios
    .patch(url, password, axiosConfigWithToken)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      if (e.status === 401 && e.response.data.message === "Unauthorized") {
        toast.error("Jeton expiré");
        return e;
      } else {
        toast.error(e.response.data.message);
      }
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

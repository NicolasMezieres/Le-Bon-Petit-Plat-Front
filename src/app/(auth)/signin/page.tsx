"use client";
import InputForm from "@/components/form/InputForm";
import MainTitle from "@/components/MainTitle";
import { Signin } from "@/Service/auth";
import { signInFormType } from "@/utils/type";
import { schemaSignin } from "@/validator/Signin";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import InputSubmit from "@/components/form/InputSubmit";
import ResetPassword from "@/components/modal/ResetPassword";
import { ContextLoading } from "@/context/context";

const Page = () => {
  const { setIsLoading } = useContext(ContextLoading);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  const { push } = useRouter();
  const [validate, setValidate] = useState<string>();
  function onChange(value: any) {
    setValidate(value);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInFormType>({
    mode: "all",
    resolver: yupResolver(schemaSignin),
  });
  const onSubmit: SubmitHandler<signInFormType> = async (data) => {
    if (validate) {
      Signin(data).then((res) => {
        if (res?.status === 201) {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.access_token);
          setIsLoading(true);
          push("/accueil");
        }
      });
    }
  };
  return (
    <main className="grow flex justify-center items-center min-h-96 max-h-screen my-6  md:px-20 xl:px-80 xl:my-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="borderOrange border self-center rounded-[45px] w-80 flex gap-5 flex-col py-5 md:w-full "
      >
        <MainTitle text={"Connexion"} />
        <InputForm
          autoComplete="off"
          addditionalCSSDiv="flex flex-col gap-2"
          textLabel={"Identifiant"}
          type={"text"}
          placeholder={"Entrez votre Identifiant"}
          register={register("identifier")}
          errors={errors.identifier?.message}
        />
        <InputForm
          addditionalCSSDiv="flex flex-col gap-2"
          textLabel={"Mot de passe"}
          type={"password"}
          placeholder={"Entrez votre Mot de passe"}
          register={register("password")}
          errors={errors.password?.message}
        />
        <div className="self-center">
          <ReCAPTCHA
            sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            onChange={onChange}
          />
          {!validate && <p className="text-red-600 text-center">Veuillez valider le CAPTCHA.</p>}
        </div>
        <InputSubmit value={"Se connecter"} />
        <p className="text-center md:text-xl">
          Vous n'êtes pas encore inscrit ?<br /> Cliquer
          <a className="orange cursor-pointer" onClick={() => push("/signup")}>
            {" ici"}
          </a>
        </p>
        <ResetPassword />
      </form>
    </main>
  );
};

export default Page;

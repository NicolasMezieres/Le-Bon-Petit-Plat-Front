"use client";
import InputForm from "@/components/form/InputForm";
import InputSubmit from "@/components/form/InputSubmit";
import FoodLoader from "@/components/loader/FoodLoader";
import MainTitle from "@/components/MainTitle";
import { ContextLoading } from "@/context/context";
import { Signup } from "@/Service/auth";
import { signUpFormType } from "@/utils/type";
import { schemaSignup } from "@/validator/Signup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const page = () => {
  const { setIsLoading } = useContext(ContextLoading);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<signUpFormType>({
    mode: "all",
    resolver: yupResolver(schemaSignup),
  });
  const onSubmit: SubmitHandler<signUpFormType> = async (data) => {
    Signup(data).then((res) => {
      if (res?.status === 201) {
        toast.success(res.data);
        setIsLoading(true);
        push("/signin");
      }
    });
  };
  return (
    <div className="flex grow justify-center my-6 md:px-20 xl:px-80 xl:my-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="borderOrange border rounded-[45px] w-80  flex gap-5 flex-col py-5 md:w-full "
      >
        <MainTitle text={"Inscription"} />
        <InputForm
          addditionalCSSDiv="flex flex-col gap-2"
          textLabel={"Nom"}
          type={"text"}
          placeholder={"Entrez votre Nom"}
          register={register("lastName")}
          errors={errors.lastName?.message}
        />
        <InputForm
          addditionalCSSDiv="flex flex-col gap-2"
          textLabel={"Prénom"}
          type={"text"}
          placeholder={"Entrez votre Prénom"}
          register={register("firstName")}
          errors={errors.firstName?.message}
        />
        <InputForm
          addditionalCSSDiv="flex flex-col gap-2"
          textLabel={"Email"}
          type={"email"}
          placeholder={"Entrez votre Email"}
          register={register("email")}
          errors={errors.email?.message}
        />
        <InputForm
          addditionalCSSDiv="flex flex-col gap-2"
          textLabel={"Nom d'utilisateur"}
          type={"text"}
          placeholder={"Entrez votre Nom d'utilisateur"}
          register={register("username")}
          errors={errors.username?.message}
        />
        <InputForm
          addditionalCSSDiv="flex flex-col gap-2"
          textLabel={"Mot de passe"}
          type={"password"}
          placeholder={"Entrez votre Mot de passe"}
          register={register("password")}
          errors={errors.password?.message}
        />
        <InputForm
          addditionalCSSDiv="flex flex-col gap-2"
          textLabel={"Confirmer le mot de passe"}
          type={"password"}
          placeholder={"Confirmer votre Mot de passe"}
          register={register("confirmPassword")}
          errors={errors.confirmPassword?.message}
        />
        <div className="flex flex-col gap-1">
          <div className="self-center md:text-xl flex justify-center gap-1">
            <input {...register("checkbox")} type="checkbox" className="h-6 w-6" id="checkbox" />
            <label htmlFor="checkbox" className="md:text-xl">
              J’accepte les <a className="orange">termes et conditions</a>
            </label>
          </div>
          {errors.checkbox && <p className="text-red-600 text-center">{errors.checkbox.message}</p>}
        </div>
        <InputSubmit value={"S'inscrire"} />
        <p className="text-center md:text-xl">
          Vous êtes déjà inscrit ? Cliquer{" "}
          <a className="orange cursor-pointer" onClick={() => push("/signin")}>
            ici
          </a>
        </p>
      </form>
    </div>
  );
};

export default page;

"use client";
import InputForm from "@/components/form/InputForm";
import InputSubmit from "@/components/form/InputSubmit";
import SecondTitle from "@/components/SecondTitle";
import ThirdTitle from "@/components/ThirdTitle";
import { ContextLoading } from "@/context/context";
import { myInfo, updateUser } from "@/Service/user";
import { updateMyInfoType, userInfoType } from "@/utils/type";
import { schemaUpdateMyInfo } from "@/validator/UpdateMyInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
const patternPass = /^[A-Z{1}a-z{1}0-9{1}#?!@$%^&*-{1}]{8,}$/;
const Page = () => {
  const { isLoading, setIsLoading } = useContext(ContextLoading);
  const { push } = useRouter();
  const [infoUser, setInfoUser] = useState<userInfoType>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<string>();
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>();

  useEffect(() => {
    myInfo().then((res) => {
      if (res?.status === 200) {
        setInfoUser(res.data);
      } else if (res?.status === 401) {
        window.localStorage.removeItem("token");
        push("/signin");
      }
    });
    setIsLoading(false);
  }, [isLoading]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<updateMyInfoType>({
    mode: "all",
    resolver: yupResolver(schemaUpdateMyInfo),
  });
  useEffect(() => {
    const password = watch("password");
    if (password) {
      if (!patternPass.test(password)) {
        setErrorPassword("Veuillez rentrer un mot de passe valide");
      } else {
        setErrorPassword("");
      }
      if (watch("password") !== watch("confirmPassword")) {
        setErrorConfirmPassword("Les mots de passe ne sont pas identiques ");
      } else {
        setErrorConfirmPassword("");
      }
    }
  }, [watch("password"), watch("confirmPassword")]);
  const onSubmit: SubmitHandler<updateMyInfoType> = async (data) => {
    if (errorConfirmPassword || errorPassword) {
      return;
    }
    if (!data.password) {
      delete data.password;
      delete data.confirmPassword;
    }
    updateUser(data).then((res) => {
      if (res?.status === 200) {
        toast.success(res.data.message);
        setIsLoading(true);
        setIsEdit(false);
      }
    });
  };
  return (
    <main className="pt-[60px] grow">
      <ThirdTitle text={"Mon profil"} />
      {!isEdit && (
        <div className="pt-10 pb-5 underline flex flex-col justify-center items-center gap-4">
          <p className="text-xl md:text-2xl">{infoUser?.lastName}</p>
          <p className="text-xl md:text-2xl">{infoUser?.firstName}</p>
          <p className="text-xl md:text-2xl">{infoUser?.email}</p>
          <p className="text-xl md:text-2xl">{infoUser?.username}</p>
          <FaRegEdit
            onClick={() => {
              setIsEdit(true);
            }}
            color="#DE742E"
            className="w-9 h-8"
          />
        </div>
      )}
      {isEdit && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center py-5 md:px-20 xl:px-80"
        >
          <div className="flex flex-col items-center min-h-screen justify-center borderOrange border-2 rounded-[45px] w-72 py-5 gap-5 md:w-full">
            <SecondTitle text={"Modification"} />
            <div className="flex flex-col gap-5">
              <InputForm
                addditionalCSSDiv="flex flex-col"
                textLabel={"Nom"}
                type={"text"}
                placeholder={"Nom"}
                defaultValue={infoUser?.lastName}
                register={register("lastName")}
                errors={errors.lastName?.message}
              />
              <InputForm
                addditionalCSSDiv="flex flex-col"
                textLabel={"Prénom"}
                type={"text"}
                placeholder={"Prénom"}
                defaultValue={infoUser?.firstName}
                register={register("firstName")}
                errors={errors.firstName?.message}
              />
              <InputForm
                addditionalCSSDiv="flex flex-col"
                textLabel={"Email"}
                type={"text"}
                placeholder={"Email"}
                defaultValue={infoUser?.email}
                register={register("email")}
                errors={errors.email?.message}
              />
              <InputForm
                addditionalCSSDiv="flex flex-col"
                textLabel={"Nom d'utilisateur"}
                type={"text"}
                placeholder={"Nom d'utilisateur"}
                defaultValue={infoUser?.username}
                register={register("username")}
                errors={errors.username?.message}
              />
              <InputForm
                defaultValue={null}
                addditionalCSSDiv="flex flex-col"
                textLabel={"Mot de passe"}
                type={"password"}
                placeholder={"Mot de passe"}
                register={register("password")}
              />
              {errorPassword && <p className="text-red-600 text-center">{errorPassword}</p>}
              <InputForm
                defaultValue={null}
                addditionalCSSDiv="flex flex-col"
                textLabel={"Confirmation mot de passe"}
                type={"password"}
                placeholder={"Confirmation mot de passe"}
                register={register("confirmPassword")}
              />
              {errorConfirmPassword && (
                <p className="text-red-600 text-center">{errorConfirmPassword}</p>
              )}
              <div className="pt-5">
                <InputSubmit value={"Confirmer"} />
              </div>
            </div>
          </div>
        </form>
      )}
    </main>
  );
};

export default Page;

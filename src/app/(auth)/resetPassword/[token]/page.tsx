"use client";
import InputForm from "@/components/form/InputForm";
import InputSubmit from "@/components/form/InputSubmit";
import MainTitle from "@/components/MainTitle";
import { ContextLoading } from "@/context/context";
import { resetPassword } from "@/Service/auth";
import { resetPasswordType } from "@/utils/type";
import { schemaResetPassword } from "@/validator/ResetPassword";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
type params = {
  token: string;
};
const Page = ({ params }: { params: params }) => {
  const { setIsLoading } = useContext(ContextLoading);
  const { push } = useRouter();
  useEffect(() => {
    setIsLoading(false);
  }, []);
  const [token, setToken] = useState<string>();
  useEffect(() => {
    setToken(params.token);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordType>({
    mode: "all",
    resolver: yupResolver(schemaResetPassword),
  });
  const onSubmit: SubmitHandler<resetPasswordType> = async (data) => {
    resetPassword(data, token).then((res) => {
      if (res?.status === 200) {
        toast.success(res.data.message);
        setIsLoading(true);
        push("/signin");
      } else if (res?.status === 401) {
        push("/signin");
      }
    });
  };
  return (
    <div className="flex justify-center items-center min-h-96 max-h-screen my-6  md:px-20 xl:px-80 xl:my-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="borderOrange border rounded-[45px] w-80  flex gap-5 flex-col py-5 md:w-full "
      >
        <MainTitle text={"Changer de mot de passe"} />
        <InputForm
          addditionalCSSDiv="flex flex-col gap-2"
          textLabel={"Nouveau mot de passe"}
          type={"password"}
          placeholder={"Entrez votre Nouveau mot de passe "}
          register={register("password")}
          errors={errors.password?.message}
        />
        <InputForm
          addditionalCSSDiv="flex flex-col gap-2"
          textLabel={"Confirmer le mot de passe"}
          type={"password"}
          placeholder={"Confirmer le mot de passe"}
          register={register("confirmPassword")}
          errors={errors.confirmPassword?.message}
        />
        <InputSubmit value="Valider" />
      </form>
    </div>
  );
};

export default Page;

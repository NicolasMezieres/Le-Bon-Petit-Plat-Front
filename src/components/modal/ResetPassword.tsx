import { Box, Modal } from "@mui/material";
import React, { useContext, useState } from "react";
import InputForm from "../form/InputForm";
import InputSubmit from "../form/InputSubmit";
import { SubmitHandler, useForm } from "react-hook-form";
import { schemaRequestResetPassword } from "@/validator/RequestResetPassword";
import { yupResolver } from "@hookform/resolvers/yup";
import { requestResetPassword } from "@/Service/auth";
import { toast } from "react-toastify";
import MainTitle from "../MainTitle";
import { ContextLoading } from "@/context/context";

const ResetPassword = () => {
  const { setIsLoading } = useContext(ContextLoading);
  const [open, setOpen] = useState(false);
  const style = {
    position: "absolute" as "fixed",
    top: "25%",
  };
  const handleOpen = () => {
    setOpen(true);
  };
  function handleClose() {
    setOpen(false);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    mode: "all",
    resolver: yupResolver(schemaRequestResetPassword),
  });
  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    setIsLoading(true);
    requestResetPassword(data).then((res) => {
      if (res?.status === 201) {
        toast.success(res.data.message);
        handleClose();
      }
    });
    setIsLoading(false);
  };

  return (
    <div className="">
      <p className="text-center cursor-pointer orange" onClick={handleOpen}>
        Mot de passe oublié
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="w-full outline-none  relative flex flex-col justify-center items-center gap-8 md:left-16 xl:left-40 rounded-2xl pt-2"
        >
          <div className="bg-[#f2f2f2] border-2 borderOrange rounded-[45px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" w-80 flex gap-5 flex-col py-5 md:w-full "
            >
              <MainTitle text={"Changer de mot de passe"} />
              <InputForm
                addditionalCSSDiv="flex flex-col gap-2"
                textLabel={"Email"}
                type={"text"}
                placeholder={"Entrez votre Email"}
                register={register("email")}
                errors={errors.email?.message}
              />
              <InputSubmit value={"Valider"} />
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ResetPassword;

import { ContextLoading } from "@/context/context";
import { Box, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import Redirection from "../Redirection";

const MenuBurger = () => {
  const { tokenInfo } = useContext(ContextLoading);
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const style = {
    position: "absolute" as "fixed",
  };
  const handleOpen = () => {
    setOpen(true);
  };
  function handleClose() {
    setOpen(false);
  }
  function deconnection() {
    window.localStorage.removeItem("token");
  }
  return (
    <div className="">
      <GiHamburgerMenu
        className="text-xl md:text-4xl"
        onClick={() => {
          handleOpen();
        }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="w-72 outline-none fixed top-0 right-0 flex flex-col justify-center items-center gap-8 rounded-2xl"
        >
          <div className="bg-[#f2f2f2] border-l-2 border-[#de742e] w-full flex justify-center gap-10 items-center flex-col h-screen">
            <IoClose
              onClick={() => setOpen(false)}
              className="orange absolute top-4 right-4 text-2xl md:text-[32px]"
            />
            <div onClick={handleClose}>
              <Redirection text="Accueil" redirection={"/accueil"} onClick={handleClose} />
            </div>
            {(!tokenInfo || (tokenInfo.role !== "User" && tokenInfo.role !== "Admin")) && (
              <div className="flex flex-col justify-center gap-10">
                <Redirection text="Connexion" redirection="/signin" />
                <Redirection text="Inscription" redirection="/signup" />
              </div>
            )}
            {tokenInfo && tokenInfo.role === "User" && (
              <div className="flex flex-col justify-center items-center gap-10">
                <Redirection text="Profil" redirection="/profil" onClick={handleClose} />
                <Redirection
                  text="Ajouter une recette"
                  redirection="/addRecipe"
                  onClick={handleClose}
                />
                <Redirection text="Mes recettes" redirection="/myRecipes" onClick={handleClose} />
                <Redirection text="Favoris" redirection="/favori" onClick={handleClose} />
                <Redirection text="Deconnexion" redirection="/signin" onClick={deconnection} />
              </div>
            )}
            {tokenInfo && tokenInfo.role === "Admin" && (
              <div className="flex flex-col justify-center items-center gap-10">
                <Redirection text="Profil" redirection="/profil" onClick={handleClose} />
                <Redirection
                  text="Ajouter une recette"
                  redirection="/addRecipe"
                  onClick={handleClose}
                />
                <Redirection text="Mes recettes" redirection="/myRecipes" onClick={handleClose} />
                <Redirection text="Favoris" redirection="/favori" onClick={handleClose} />
                <Redirection
                  text="Liste utilisateur"
                  redirection="/userList"
                  onClick={handleClose}
                />
                <Redirection text="Deconnexion" redirection="/signin" onClick={deconnection} />
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MenuBurger;

import { ContextLoading } from "@/context/context";
import { Box, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { lookRecipeType } from "@/utils/type";
import RecipeItem from "../recipe/RecipeItem";
import { deleteRecipe } from "@/Service/recipe";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
const style = {
  position: "absolute" as "fixed",
};
const RecipeDelete = ({ Recipe }: { Recipe: lookRecipeType }) => {
  const { tokenInfo, setIsLoading } = useContext(ContextLoading);
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  function removeRecipe(id: string) {
    deleteRecipe(id).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        push("/accueil");
      } else if (res.status === 401) {
        window.localStorage.removeItem("token");
        push("/signin");
      }
    });
  }
  const handleOpen = () => {
    if (tokenInfo) {
      setOpen(true);
    } else {
      push("/signin");
    }
  };
  function handleClose() {
    setOpen(false);
  }
  return (
    <div>
      <MdDelete onClick={() => handleOpen()} color="#DE742E" className="w-10 h-10 cursor-pointer" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <Box
          sx={style}
          className="outline-none fixed flex flex-col justify-center items-center gap-8 rounded-2xl"
        >
          <div className="bg-[#f2f2f2] border-2 border-[#de742e] w-full flex justify-center gap-4 items-center flex-col p-10 rounded-3xl">
            <IoClose
              onClick={() => handleClose()}
              className="orange absolute cursor-pointer top-4 right-4 text-2xl md:text-[32px]"
            />
            <p className=" text-[#cc3333]">Voulez-vous vraiment supprimer cette recette ?</p>
            <RecipeItem Element={Recipe} />
            <input
              onClick={() => {
                removeRecipe(Recipe.id);
              }}
              type="submit"
              value="Supprimer"
              className={`w-32 text-center h-9 bg-[#cc3333] text-[#f2f2f2] rounded-3xl drop-shadow-[0_2px_3px_#212121] cursor-pointer`}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RecipeDelete;

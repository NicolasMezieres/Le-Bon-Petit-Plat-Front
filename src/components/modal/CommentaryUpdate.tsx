import { ContextLoading } from "@/context/context";
import { Box, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import SearchNotation from "../SearchNotation";
import { createCommentary, updateCommentary } from "@/Service/commentary";
import { commentaryType } from "@/utils/type";
import { toast } from "react-toastify";
const style = {
  position: "absolute" as "fixed",
};
const CommentaryUpdate = ({ commentary }: { commentary: commentaryType }) => {
  const { tokenInfo, setIsLoading } = useContext(ContextLoading);
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const [selectNote, setSelectNote] = useState<number>(0);
  const [starSelected, setStarSelected] = useState<React.JSX.Element[]>();
  const [commentaryText, setCommentaryText] = useState<string>(commentary.text);
  const [errorNote, setErrorNote] = useState<string>();
  const handleOpen = () => {
    setSelectNote(commentary.note);
    if (tokenInfo) {
      setOpen(true);
    } else {
      push("/signin");
    }
  };
  function handleClose() {
    setOpen(false);
  }
  function patchCommentary() {
    if (!selectNote || selectNote <= 0 || selectNote > 5) {
      setErrorNote("Veuillez mettre une note entre 1 et 5");
    } else {
      const data = { idRecipe: commentary.idRecipe, note: selectNote, text: commentaryText };
      updateCommentary(data, commentary._id).then((res) => {
        if (res?.status === 200) {
          toast.success("Modification avec succès");
          setIsLoading(true);
        }
        handleClose();
      });
    }
  }
  return (
    <div>
      <FaRegEdit
        color="#DE742E"
        className="w-6 h-6 absolute top-4 right-12 orange cursor-pointer"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="w-[292px] md:w-96 outline-none fixed top-0 right-0 flex flex-col justify-center items-center gap-8 rounded-2xl"
        >
          <div className="bg-[#f2f2f2] border-l-2 border-[#de742e] w-full flex justify-center gap-4 items-center flex-col h-screen px-4">
            <IoClose
              onClick={() => handleClose()}
              className="orange absolute top-4 right-4 text-2xl md:text-[32px]"
            />
            <div className="grid grid-cols-2 w-full">
              <p className="self-start">Donnez votre avis</p>
              <div className="flex justify-end">
                <SearchNotation
                  size="w-5 h-5 md:w-6 md:h-6"
                  additionalCSS="flex"
                  selectNote={selectNote}
                  setSelectNote={setSelectNote}
                  setStarSelected={setStarSelected}
                  starSelected={starSelected}
                />
              </div>
            </div>
            {errorNote && <p className="text-red-600">{errorNote}</p>}
            <div className="w-64 md:w-96 md:px-4 md:py-4 shadow-[0_0_2px_[#212121] ">
              <textarea
                className="w-full rounded-3xl px-4 py-4"
                placeholder="Entrer votre message ici"
                value={commentaryText}
                onChange={(e) => {
                  setCommentaryText(e.target.value);
                }}
              />
            </div>
            <input
              onClick={() => {
                patchCommentary();
              }}
              type="submit"
              value="Valider"
              className={`w-32 self-end text-center h-9 bg-[#de742e] text-white rounded-3xl drop-shadow-[0_2px_3px_#212121]`}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CommentaryUpdate;

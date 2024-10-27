import { ContextLoading } from "@/context/context";
import { Box, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import SearchNotation from "../SearchNotation";
const style = {
  position: "absolute" as "fixed",
};
const CommentaryCreate = () => {
  const { tokenInfo } = useContext(ContextLoading);
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const [selectNote, setSelectNote] = useState<number>(0);
  const [starSelected, setStarSelected] = useState<React.JSX.Element[]>();
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
      <div className="flex justify-center" onClick={() => handleOpen()}>
        <p className="pr-5">Donnez votre avis</p>
        <FaRegStar color="#DE742E" className="w-6 h-6" />
        <FaRegStar color="#DE742E" className="w-6 h-6" />
        <FaRegStar color="#DE742E" className="w-6 h-6" />
        <FaRegStar color="#DE742E" className="w-6 h-6" />
        <FaRegStar color="#DE742E" className="w-6 h-6" />
      </div>
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
              onClick={() => handleClose}
              className="orange absolute top-4 right-4 text-2xl md:text-[32px]"
            />
            <SearchNotation
              selectNote={selectNote}
              setSelectNote={setSelectNote}
              setStarSelected={setStarSelected}
              starSelected={starSelected}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CommentaryCreate;

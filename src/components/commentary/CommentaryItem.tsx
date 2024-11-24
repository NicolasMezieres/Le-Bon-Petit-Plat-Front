import { ContextLoading } from "@/context/context";
import { commentaryType } from "@/utils/type";
import React, { useContext } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import DeleteCommentary from "./DeleteCommentary";
import CommentaryUpdate from "../modal/CommentaryUpdate";

const CommentaryItem = ({ commentary }: { commentary: commentaryType }) => {
  const { tokenInfo } = useContext(ContextLoading);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < commentary.note) {
      stars.push(<FaStar color="#DE742E" className="w-6 h-6" key={i} />);
    } else {
      stars.push(<FaRegStar color="#DE742E" className="w-6 h-6" key={i} />);
    }
  }
  const date = new Date(commentary.createdAt);
  return (
    <div className="shadow-[0_0_2px_#212121] relative p-4 rounded-3xl">
      {(tokenInfo?.sub === commentary.idUser || tokenInfo?.role === "Admin") && (
        <>
          <CommentaryUpdate commentary={commentary} />
          <DeleteCommentary commentary={commentary} />
        </>
      )}
      <p className="text-[#DE742E]">{commentary.username}</p>
      <div className="flex">{stars}</div>
      <p>{commentary.text}</p>
      <p className="text-[#888]">{date.toLocaleDateString("fr")}</p>
    </div>
  );
};

export default CommentaryItem;

import React, { useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const SearchNotation = ({
  selectNote,
  setSelectNote,
  setStarSelected,
  starSelected,
  size,
  additionalCSS,
}: {
  selectNote: number;
  setSelectNote: React.Dispatch<React.SetStateAction<number>>;
  setStarSelected: React.Dispatch<React.SetStateAction<React.JSX.Element[] | undefined>>;
  starSelected: React.JSX.Element[] | undefined;
  size?: string;
  additionalCSS?: string;
}) => {
  function changeNote(star: number) {
    if (selectNote === star) {
      setSelectNote(0);
    } else {
      setSelectNote(star);
    }
  }
  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < selectNote) {
        stars.push(
          <FaStar
            color="#DE742E"
            className={` ${size ? size : "w-6 h-6"} cursor-pointer`}
            onClick={() => changeNote(i + 1)}
            key={i}
          />
        );
      } else {
        stars.push(
          <FaRegStar
            color="#DE742E"
            className={`${size ? size : "w-6 h-6"} cursor-pointer`}
            onClick={() => changeNote(i + 1)}
            key={i}
          />
        );
      }
    }
    setStarSelected(stars);
  }, [selectNote]);
  return (
    <div className={`${additionalCSS ? additionalCSS : "flex mx-auto"}`}>
      {starSelected &&
        starSelected.map((Element) => {
          return Element;
        })}
    </div>
  );
};

export default SearchNotation;

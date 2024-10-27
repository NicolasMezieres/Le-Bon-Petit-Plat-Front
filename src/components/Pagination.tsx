import { ContextLoading } from "@/context/context";
import React, { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";

const Pagination = ({
  page,
  isNextPage,
  setPage,
  additionalCSSDiv
}: {
  page: number;
  isNextPage: boolean | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  additionalCSSDiv?: string;
}) => {
  const { setIsLoading } = useContext(ContextLoading);
  return (
    <div className={`flex justify-center items-center gap-4 mt-5 ${additionalCSSDiv}`}>
      {page > 0 && (
        <FaArrowRight
          color="#DE742E"
          className="w-4 h-4 md:w-6 md:h-6 rotate-180"
          onClick={() => {
            setIsLoading(true);
            setPage((prev) => prev - 1);
          }}
        />
      )}
      <p className="orange md:text-2xl">{page + 1}</p>
      {isNextPage && (
        <FaArrowRight
          color="#DE742E"
          className="w-4 h-4 md:w-6 md:h-6"
          onClick={() => {
            setIsLoading(true);
            setPage((prev) => prev + 1);
          }}
        />
      )}
    </div>
  );
};

export default Pagination;

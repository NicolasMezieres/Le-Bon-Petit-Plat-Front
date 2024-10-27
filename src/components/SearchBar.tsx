import { ContextLoading } from "@/context/context";
import React, { useContext } from "react";
import { IoClose, IoSearchSharp } from "react-icons/io5";

const SearchBar = ({
  setSearch,
  setPage,
  search,
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  search: string | undefined;
}) => {
  const { setIsLoading } = useContext(ContextLoading);
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="w-44 md:w-72 relative flex rounded-3xl bg-[#f8f8f8] shadow-[0_-2px_2px_#888] ">
        <IoSearchSharp className="w-6 h-6 absolute left-[3px] text-[#888] z-10" />
        <input
          className="w-full px-8 rounded-3xl text-center bg-[#f8f8f8] placeholder:text-[#888] placeholder:opacity-50 relative z-0"
          placeholder="Recherche..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
            setIsLoading(true);
          }}
        />
        <IoClose className="absolute w-6 h-6 right-2" onClick={()=>setSearch("")} />
      </div>
    </div>
  );
};

export default SearchBar;

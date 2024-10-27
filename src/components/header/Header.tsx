import React, { useContext, useEffect } from "react";
import Logo from "./Logo";
import MenuBurger from "../modal/MenuBurger";
import { ContextLoading } from "@/context/context";

const Header = () => {
  const { tokenInfo } = useContext(ContextLoading);
  useEffect(() => {
    console.log(tokenInfo);
  }, []);
  return (
    <header className="flex justify-between px-6 md:px-20 items-center mt-4 md:mt-5">
      <Logo />
      <MenuBurger />
    </header>
  );
};

export default Header;

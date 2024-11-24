import React from "react";
import Logo from "./Logo";
import MenuBurger from "../modal/MenuBurger";
const Header = () => {
  return (
    <header className="flex justify-between px-6 md:px-20 items-center mt-4 md:mt-5">
      <Logo />
      <MenuBurger />
    </header>
  );
};

export default Header;

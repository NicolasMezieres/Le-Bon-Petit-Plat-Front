import React from "react";
import Logo from "./Logo";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  return (
    <header className="flex justify-between px-6 md:px-20 items-center mt-4 md:mt-5">
      <Logo />
      //todo modal en fonction de si il y à un token si le token est admin ou user
      <GiHamburgerMenu className="text-xl md:text-4xl" />
    </header>
  );
};

export default Header;

import React from "react";
import Logo from "./Logo";

const HeaderAuth = ({ additionalCSS }: { additionalCSS?: string }) => {
  return (
    <header
      className={`flex justify-center mt-4 md:mt-5 ${
        additionalCSS ? additionalCSS : "relative"
      } z-10 `}
    >
      <Logo />
    </header>
  );
};

export default HeaderAuth;

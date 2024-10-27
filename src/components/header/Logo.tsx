import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Image
      priority={true}
      height={500}
      width={500}
      className="h-16 w-32 md:h-32 md:w-64"
      src={"/logo.png"}
      alt="logo le bon petit plat"
    />
  );
};

export default Logo;

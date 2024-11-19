import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
const Logo = () => {
  const { push } = useRouter();
  return (
    <Image
      priority={true}
      height={500}
      width={500}
      className="h-16 w-32 md:h-32 md:w-64 cursor-pointer"
      src={"/logo.png"}
      alt="logo le bon petit plat"
      onClick={() => {
        push("/accueil");
      }}
    />
  );
};

export default Logo;

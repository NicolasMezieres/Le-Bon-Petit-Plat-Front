import React from "react";

const MainTitle = ({ text, additionalCSS }: { text: string; additionalCSS?: string }) => {
  return <h1 className={`text-2xl text-center md:text-[32px] ${additionalCSS}`}>{text}</h1>;
};

export default MainTitle;

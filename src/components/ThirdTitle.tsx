import React from "react";

const ThirdTitle = ({ text, additionalCSS }: { text: string; additionalCSS?: string }) => {
  return <h3 className={`text-xl text-center ${additionalCSS}`}>{text}</h3>;
};

export default ThirdTitle;

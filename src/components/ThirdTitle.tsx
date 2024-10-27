import React from "react";

const ThirdTitle = ({
  text,
  additionalCSS,
  size,
}: {
  text: string;
  additionalCSS?: string;
  size?: string;
}) => {
  return <h3 className={`${size ? size : "text-xl"} text-center ${additionalCSS}`}>{text}</h3>;
};

export default ThirdTitle;

import React from "react";

const SecondTitle = ({ text, additionalCSS }: { text: string; additionalCSS?: string }) => {
  return <h2 className={`text-2xl text-center ${additionalCSS}`}>{text}</h2>;
};

export default SecondTitle;

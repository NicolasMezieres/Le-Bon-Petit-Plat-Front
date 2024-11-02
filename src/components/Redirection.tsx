import { useRouter } from "next/navigation";
import React from "react";

const Redirection = ({
  additionalCSS,
  redirection,
  text,
  onClick,
}: {
  additionalCSS?: string;
  redirection?: string;
  text: string;
  onClick?: () => void;
}) => {
  function click() {
    if (onClick) {
      onClick();
    }
  }
  const { push } = useRouter();
  return (
    <p
      className={`cursor-pointer md:text-2xl ${additionalCSS}`}
      onClick={() => {
        click();
        push(`${redirection}`);
      }}
    >
      {text}
    </p>
  );
};

export default Redirection;

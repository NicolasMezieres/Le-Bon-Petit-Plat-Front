"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
  const { push } = useRouter();
  return (
    <footer className="bg-[#d0d0d0] w-screen z-50">
      <div className="flex justify-center gap-5 pt-5">
        <p className="cursor-pointer" onClick={() => push("/conditions")}>
          Conditions générales
        </p>
        <p className="cursor-pointer" onClick={() => push("/conditions")}>
          Mention légales
        </p>
      </div>
      <p className="text-center py-5">© Copyright 2024</p>
    </footer>
  );
};

export default Footer;

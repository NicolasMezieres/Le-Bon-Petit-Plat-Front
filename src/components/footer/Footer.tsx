import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#d0d0d0] absolute bottom-0 w-screen z-10">
      <div className="flex justify-center gap-5 pt-5">
        <p>Conditions générales</p>
        <p>Mention légales</p>
      </div>
      <p className="text-center py-5">© Copyright 2024</p>
    </footer>
  );
};

export default Footer;

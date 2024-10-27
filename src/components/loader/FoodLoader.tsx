import React from "react";
import "./food-loader.css";
import Image from "next/image";
const FoodLoader = () => {
  return (
    <div className="loader-wrapper fixed md:top-40 xl:top-20 right-2 md:right-10 xl:right-40">
      <div
        className="loader h-14 w-14 md:h-20 md:w-20 flex justify-center items-center"
        id="spinner"
      >
        <Image
          priority={true}
          width={200}
          height={200}
          src={"/BurgerLoad.png"}
          alt="loading burger logo"
          className="food-icon h-8 w-8 md:w-12 md:h-12 relative bottom-[7px] right-[7px]"
        />
      </div>
    </div>
  );
};

export default FoodLoader;

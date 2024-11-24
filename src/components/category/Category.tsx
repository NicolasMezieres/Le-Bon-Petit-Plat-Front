import React from "react";
import { UseFormSetValue } from "react-hook-form";
import { BiSolidDish } from "react-icons/bi";
import { FaBeerMugEmpty } from "react-icons/fa6";
import { GiCharcuterie, GiCroissant } from "react-icons/gi";
import { LuIceCream2, LuSalad } from "react-icons/lu";

const Category = ({
  selectCategory,
  setSelectCategory,
  setValue,
  field,
  setValueCategory,
  valueCategory,
  defaultValue,
}: {
  selectCategory: number | undefined;
  setSelectCategory: React.Dispatch<React.SetStateAction<number | undefined>>;
  setValue?: UseFormSetValue<any>;
  field?: string;
  defaultValue?: string;
  valueCategory?: string | undefined;
  setValueCategory?: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  function valueDefault(defaultValue: string) {
    let idCategory: number | undefined;
    switch (defaultValue) {
      case "Petit-déj":
        idCategory = 1;
        break;
      case "Apéritif":
        idCategory = 2;
        break;
      case "Boisson":
        idCategory = 3;
        break;
      case "Entrée":
        idCategory = 4;
        break;
      case "Plat":
        idCategory = 5;
        break;
      case "Dessert":
        idCategory = 6;
        break;
      default:
        idCategory = undefined;
    }
    return idCategory;
  }
  if (defaultValue) {
    const idCategory = valueDefault(defaultValue);
    setSelectCategory(idCategory);
  }
  function select(idCategory: number, value: string) {
    if (valueCategory === value) {
      setSelectCategory(undefined);
      if (setValueCategory) {
        setValueCategory(undefined);
      }
      if (setValue && field) {
        setValue("", undefined);
      }
    } else {
      setSelectCategory(idCategory);
      if (setValue && field) {
        console.log("ici");
        setValue(field, value);
      }
      if (setValueCategory) {
        setValueCategory(value);
      }
    }
  }
  return (
    <>
      <div className="flex gap-4 mx-auto md:gap-x-10">
        <article
          onClick={() => {
            select(1, "Petit-déj");
          }}
          className={`flex flex-col cursor-pointer items-center border-2 ${
            selectCategory === 1 ? " borderOrange" : "border-transparent"
          } w-20 md:w-24`}
        >
          <p className="md:text-2xl">Petit-déj</p>
          <GiCroissant color="#DE742E" className="w-8 h-8 md:w-12 md:h-12" />
        </article>
        <article
          onClick={() => {
            select(2, "Apéritif");
          }}
          className={`flex flex-col cursor-pointer items-center border-2  ${
            selectCategory === 2 ? "borderOrange" : "border-transparent"
          }  w-20 md:w-24`}
        >
          <p className="md:text-2xl">Apéritif</p>
          <GiCharcuterie color="#DE742E" className="w-8 h-8 md:w-12 md:h-12" />
        </article>
        <article
          onClick={() => {
            select(3, "Boisson");
          }}
          className={`flex flex-col cursor-pointer items-center border-2  ${
            selectCategory === 3 ? "border-2 borderOrange" : "border-transparent"
          }  w-20 md:w-24`}
        >
          <p className="md:text-2xl">Boisson</p>
          <FaBeerMugEmpty color="#DE742E" className="w-8 h-8 md:w-12 md:h-12" />
        </article>
      </div>
      <div className="flex gap-4 mx-auto md:gap-x-10">
        <article
          onClick={() => {
            select(4, "Entrée");
          }}
          className={`flex flex-col cursor-pointer items-center border-2 ${
            selectCategory === 4 ? "border-2 borderOrange" : "border-transparent"
          }  w-20 md:w-24`}
        >
          <p className="md:text-2xl">Entrée</p>
          <LuSalad color="#DE742E" className="w-8 h-8 md:w-12 md:h-12" />
        </article>
        <article
          onClick={() => {
            select(5, "Plat");
          }}
          className={`flex flex-col cursor-pointer items-center border-2  ${
            selectCategory === 5 ? "borderOrange" : "border-transparent"
          }  w-20 md:w-24`}
        >
          <p className="md:text-2xl">Plat</p>
          <BiSolidDish color="#DE742E" className="w-8 h-8 md:w-12 md:h-12" />
        </article>
        <article
          onClick={() => {
            select(6, "Dessert");
          }}
          className={`flex flex-col cursor-pointer items-center border-2  ${
            selectCategory === 6 ? "borderOrange" : "border-transparent"
          }  w-20 md:w-24`}
        >
          <p className="md:text-2xl">Dessert</p>
          <LuIceCream2 color="#DE742E" className="w-8 h-8 md:w-12 md:h-12" />
        </article>
      </div>
    </>
  );
};

export default Category;

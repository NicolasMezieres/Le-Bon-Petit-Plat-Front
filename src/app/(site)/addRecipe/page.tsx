"use client";
import Category from "@/components/category/Category";
import InputForm from "@/components/form/InputForm";
import InputSubmit from "@/components/form/InputSubmit";
import InputSelect from "@/components/InputSelect";
import MainTitle from "@/components/MainTitle";
import ThirdTitle from "@/components/ThirdTitle";
import { ContextLoading } from "@/context/context";
import { uploadImage } from "@/Service/image";
import { createRecipe } from "@/Service/recipe";
import { categoryType, ingredientFormType, recipeFormType, recipeType } from "@/utils/type";
import { schemaIngredient } from "@/validator/Ingredient";
import { schemaRecipe } from "@/validator/Recipe";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiSolidDish } from "react-icons/bi";
import { FaBeerMugEmpty, FaCaretDown } from "react-icons/fa6";
import { GiCharcuterie, GiCroissant } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { LuIceCream2, LuSalad } from "react-icons/lu";
import { toast } from "react-toastify";

const page = () => {
  const { push } = useRouter();
  const { setIsLoading } = useContext(ContextLoading);
  const [image, setImage] = useState<string>();
  const [nameImage, setNameImage] = useState<string>();
  const [categoryList, setCategoryList] = useState<categoryType[]>();
  const [selectCategory, setSelectCategory] = useState<number | undefined>(1);
  const [unit, setUnit] = useState<string>();
  const [inputStep, setInputStep] = useState<{ step: string }>({ step: "" });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<recipeFormType>({
    mode: "all",
    resolver: yupResolver(schemaRecipe),
  });
  const onSubmit: SubmitHandler<recipeFormType> = async (data) => {
    const imageForm = watch("file");
    if (imageForm) {
      uploadImage(imageForm).then((res) => {
        console.log(res);
        if (res?.status === 201) {
          data.picture = res.data;
          createRecipe(data).then((res) => {
            console.log(res);
            if (res.status === 401) {
              push("/signin");
            } else if (res.status === 201) {
              toast.success(res.data.message);
              push("/accueil");
            }
          });
        }
      });
    }
  };
  useEffect(() => {
    const imageForm = watch("file");
    if (imageForm && imageForm.length > 0) {
      console.log(imageForm);
      const blob = new Blob([imageForm[0]]);
      const url = URL.createObjectURL(blob);
      setNameImage(imageForm[0].name);
      setImage(url);
      setValue("picture", imageForm[0].name);
    }
  }, [watch("file")]);
  useEffect(() => {
    setValue("nameCategory", "Petit-déj");
  }, []);
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    setValue: setValue2,
    formState: { errors: errors2 },
  } = useForm<ingredientFormType>({
    mode: "all",
    resolver: yupResolver(schemaIngredient),
  });
  const ingredientSubmit: SubmitHandler<ingredientFormType> = async (data) => {
    const newData = watch("ingredient");
    console.log(data);
    if (newData) {
      newData.push(data);
      setValue("ingredient", newData);
    } else {
      setValue("ingredient", [data]);
    }
  };
  function removeIngredient(index: number) {
    const data = watch("ingredient");
    if (data) {
      const newData = data.filter((Element) => Element !== data[index]);
      setValue("ingredient", newData);
    }
  }
  function addStep() {
    const ExistingStep = watch("cookingStep");
    if (inputStep.step) {
      if (ExistingStep) {
        console.log(inputStep.step);
        ExistingStep.push(inputStep);
        setValue("cookingStep", ExistingStep);
      } else {
        setValue("cookingStep", [inputStep]);
      }
      setInputStep({ step: "" });
    }
    console.log(watch("ingredient"));
  }
  function removeStep(index: number) {
    const existingStep = watch("cookingStep");
    if (existingStep) {
      const newData = existingStep.filter((Element) => Element !== existingStep[index]);
      setValue("cookingStep", newData);
    }
  }
  return (
    <main className="grow flex flex-col items-center mt-4 md:px-20">
      <div className="w-80 borderOrange border-2 rounded-[45px] py-5 md:w-[608px] bg-[#EAEAEA] mb-4">
        <MainTitle text="Ajouter une recette" additionalCSS="mb-4" />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
          <InputForm
            addditionalCSSDiv="flex flex-col items-center"
            textLabel={"Nom de la recette"}
            type={"text"}
            placeholder={"Entrer le Nom de la recette"}
            register={register("title")}
            errors={errors.title?.message}
          />
          <ThirdTitle text={"Image"} />
          <InputForm
            addditionalCSSDiv="flex flex-col items-center"
            additionalCSSLabel="w-36 bg-[#f8f8f8] rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:w-44"
            additionalCSSInput="hidden"
            textLabel={"Choisir une image"}
            type={"file"}
            placeholder={"Veuillez choisir une image"}
            register={register("file")}
            errors={errors.picture?.message}
          />
          {nameImage && <p>{nameImage}</p>}
          {image && (
            <Image
              width={1000}
              height={1000}
              src={image}
              alt="Image de la recette"
              className="w-64 md:w-80"
            />
          )}
          <ThirdTitle additionalCSS="md:text-[28px]" text="Les catégories" />
          <Category
            selectCategory={selectCategory}
            setSelectCategory={setSelectCategory}
            setValue={setValue}
            field="nameCategory"
          />
          <InputForm
            addditionalCSSDiv="flex flex-col items-center justify-center"
            additionalCSSInput="md:text-xl text-center"
            sizeInput="w-28 md:w-36"
            textLabel={"Nombre de part"}
            type={"number"}
            placeholder={"4"}
            register={register("piece")}
            errors={errors.piece?.message}
          />
          <InputForm
            addditionalCSSDiv="flex flex-col items-center justify-center"
            additionalCSSInput="pl-5 md:text-xl"
            sizeInput="w-28 md:w-36"
            textLabel={"Temps de préparation"}
            type={"time"}
            placeholder={"4"}
            register={register("preparationTime")}
            errors={errors.preparationTime?.message}
          />
          <InputForm
            addditionalCSSDiv="flex flex-col items-center justify-center"
            additionalCSSInput="pl-5 md:text-xl "
            sizeInput="w-28 md:w-36"
            textLabel={"Temps de cuisson"}
            type={"time"}
            placeholder={""}
            register={register("cookingTime")}
            errors={errors.cookingTime?.message}
          />
          <InputForm
            addditionalCSSDiv="flex flex-col items-center justify-center"
            additionalCSSInput="w-28 md:w-36 pl-5 md:text-xl "
            sizeInput="w-28 md:w-36"
            textLabel={"Temps de repos"}
            type={"time"}
            placeholder={""}
            register={register("standingTime")}
            errors={errors.standingTime?.message}
          />
          <ThirdTitle additionalCSS="md:text-[28px]" text="Difficulté" />
          <InputSelect
            label={"Sélectionner une difficulté"}
            data={[
              { content: "Facile", value: "1" },
              { content: "Intermédiaire", value: "2" },
              { content: "Difficile", value: "3" },
            ]}
            additionalCSS="bg-[#f8f8f8] rounded-[45px] shadow-[0_4px_4px_rgba(21,21,21,0.25)] w-64"
            register={register("difficulty")}
            errors={errors.difficulty?.message}
          />
          <input type="submit" id="addRecipe" hidden />
        </form>
        <ThirdTitle additionalCSS="md:text-[28px] pt-4 pb-2.5" text="Ajouter un ingrédient" />
        <div className="flex flex-col items-center gap-2.5 ">
          <form
            onSubmit={handleSubmit2(ingredientSubmit)}
            className="bg-[#f8f8f8] flex flex-col items-center gap-4 w-64 md:w-72 py-4 rounded-3xl shadow-[0_0_2px_#212121]"
          >
            <InputForm
              textLabel={"Quantité"}
              type={"number"}
              step={"0.01"}
              placeholder={"Entrer une quantité"}
              addditionalCSSDiv="flex flex-col items-center justify-center gap-2.5"
              additionalCSSInput="border-2 border-[#212121]"
              sizeInput="w-44 md:w-64"
              register={register2("quantity")}
              errors={errors2.quantity?.message}
            />
            <div>
              <ThirdTitle
                size="text-base"
                text="Unité"
                additionalCSS="text-center md:text-[28px] mb-2.5"
              />
              <InputSelect
                label={"Sélectionner une unité"}
                data={[
                  { content: "g", value: "g" },
                  { content: "ml", value: "ml" },
                  { content: "Cuillère à soupe", value: "Cuillère à soupe" },
                  { content: "Cuillère à café", value: "Cuillère à café" },
                  { content: "Verre", value: "Verre" },
                ]}
                additionalCSS="bg-[#f8f8f8] rounded-[45px] shadow-[0_4px_4px_rgba(21,21,21,0.25)] w-44 md:w-64"
                register={register2("unit")}
                errors={errors2.unit?.message}
              />
            </div>

            <InputForm
              addditionalCSSDiv="flex flex-col items-center justify-center gap-2.5"
              additionalCSSInput="border-2 border-[#212121]"
              sizeInput="w-44 md:w-64"
              textLabel={"ingredient"}
              type={"text"}
              placeholder={"Entrer un Ingrédient"}
              register={register2("ingredient")}
              errors={errors2.ingredient?.message}
            />
            <input
              onClick={() => {
                console.log(watch2("quantity"), watch2("unit"), watch2("ingredient"));
              }}
              type="submit"
              value={"Valider"}
              className="bg-[#DE742E] text-white rounded-[20px] w-32 h-7 shadow-[0_1px_1px_#212121]"
            />
          </form>
        </div>
        {errors.ingredient?.message && (
          <p className="text-red-600 text-center">{errors.ingredient?.message}</p>
        )}
        <ThirdTitle additionalCSS="md:text-[28px] pt-4 pb-2.5" text="Liste ingrédients" />
        <section className="bg-[#f8f8f8] relative flex flex-col justify-center items-center gap-4 w-64 md:w-72 mx-[auto] py-4 rounded-3xl shadow-[0_0_2px_#212121]">
          {watch("ingredient") && watch("ingredient").length > 0 ? (
            watch("ingredient").map((ingredient, index) => {
              return (
                <div key={index} className="relative w-64">
                  <p className="text-center px-10">
                    {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
                  </p>
                  <IoClose
                    onClick={() => removeIngredient(index)}
                    className="absolute top-0 text-2xl right-4 text-[#DE742E]"
                  />
                </div>
              );
            })
          ) : (
            <ThirdTitle size="text-base" text="Aucun Ingrédient" />
          )}
        </section>
        <ThirdTitle additionalCSS="md:text-[28px] pt-4 pb-2.5" text="Ajouter une étape" />
        <div className="w-64 md:w-72 bg-[#f8f8f8] flex flex-col justify-center items-center mx-auto py-4 gap-4 rounded-3xl shadow-[0_0_2px_#212121]">
          <textarea
            placeholder="Entrer votre étape"
            value={inputStep?.step}
            onChange={(e) => {
              setInputStep({ step: e.target.value });
            }}
            className="w-56 md:w-64 h-14 border-2 text-left align-top border-[#212121] block mx-auto mb-4 px-0.5"
          />
          <button
            onClick={() => {
              addStep();
              setInputStep({ step: "" });
            }}
            className="bg-[#DE742E] text-center text-white rounded-[20px] w-32 h-7 shadow-[0_1px_1px_#212121]"
          >
            Valider
          </button>
        </div>
        {errors.cookingStep?.message && (
          <p className="text-red-600 text-center">{errors.cookingStep.message}</p>
        )}
        <ThirdTitle size="text-base" text="Étape" additionalCSS="mt-4 mb-2.5" />
        <section className="bg-[#f8f8f8] relative flex flex-col justify-center items-center gap-4 w-64 md:w-72 mx-[auto] py-4 rounded-3xl shadow-[0_0_2px_#212121]">
          {watch("cookingStep") && watch("cookingStep").length > 0 ? (
            watch("cookingStep").map((step, index) => {
              return (
                <div key={index} className="relative w-64">
                  <p className="text-center px-10">
                    <span className="absolute left-4">
                      {index + 1}
                      {")"}
                    </span>
                    {step.step}
                  </p>
                  <IoClose
                    onClick={() => removeStep(index)}
                    className="absolute top-0 text-2xl right-4 text-[#DE742E]"
                  />
                </div>
              );
            })
          ) : (
            <ThirdTitle size="text-base" text="Aucune étape" />
          )}
        </section>
        <div
          className={
            "w-64 h-9 flex mx-auto mt-4 justify-center items-center bgBlue text-white self-center md:w-72 md:text-xl rounded-3xl drop-shadow-[0_2px_3px_#212121]"
          }
        >
          <label htmlFor="addRecipe" onClick={() => console.log(watch("nameCategory"))}>
            Ajouter une recette
          </label>
        </div>
      </div>
    </main>
  );
};

export default page;

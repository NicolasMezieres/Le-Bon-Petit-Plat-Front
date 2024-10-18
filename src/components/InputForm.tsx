import { signUpFormType } from "@/utils/type";
import { register } from "module";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
const InputForm = ({
  addditionalCSSDiv,
  textLabel,
  additionalCSSLabel,
  type,
  placeholder,
  additionalCSSInput,
  register,
  errors,
  autoComplete,
  defaultValue,
}: {
  addditionalCSSDiv?: string;
  textLabel: string;
  additionalCSSLabel?: string;
  type: string;
  placeholder: string;
  additionalCSSInput?: string;
  autoComplete?: string;
  defaultValue?: string;
  register: {};
  errors?: string;
}) => {
  return (
    <div className={addditionalCSSDiv}>
      <label
        htmlFor={textLabel}
        className={`text-center md:text-xl md:text-center ${additionalCSSLabel}`}
      >
        {textLabel}
      </label>
      <input
        defaultValue={defaultValue ? defaultValue : undefined}
        autoComplete={autoComplete ? autoComplete : "off"}
        id={textLabel}
        type={type}
        placeholder={placeholder}
        className={`w-64 self-center md:text-xl md:w-80 text-center rounded-3xl ${additionalCSSInput}`}
        {...register}
      />

      {errors && <p className="text-red-600 text-center">{errors}</p>}
    </div>
  );
};

export default InputForm;

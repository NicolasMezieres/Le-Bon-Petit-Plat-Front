import React from "react";
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
  sizeInput,
}: {
  addditionalCSSDiv?: string;
  textLabel: string;
  additionalCSSLabel?: string;
  type: string;
  placeholder: string;
  additionalCSSInput?: string;
  autoComplete?: string;
  defaultValue?: string | null;
  register?: {};
  errors?: string;
  sizeInput?: string;
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
        className={` self-center ${
          sizeInput ? sizeInput : "md:text-xl md:w-80"
        } text-center rounded-3xl ${additionalCSSInput ? additionalCSSInput : "w-64"}`}
        {...register}
      />

      {errors && <p className="text-red-600 text-center">{errors}</p>}
    </div>
  );
};

export default InputForm;

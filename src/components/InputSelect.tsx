import React from "react";

const InputSelect = ({
  additionalCSS,
  register,
  errors,
  optionalCSS,
  label,
  data,
}: {
  additionalCSS?: string;
  register?: {};
  errors?: string;
  optionalCSS?: string;
  label: string;
  data: { content: string; value: string | number | readonly string[] | undefined }[];
}) => {
  return (
    <>
      <select {...register} className={`appearance-none text-center ${additionalCSS}`}>
        <option value={""} hidden>
          {label}
        </option>
        {data &&
          data.map((Element, index) => {
            return (
              <option key={index} className={`${optionalCSS}`} value={Element.value}>
                {Element.content}
              </option>
            );
          })}
      </select>
      {errors && <p className="text-red-600 text-center">{errors}</p>}
    </>
  );
};

export default InputSelect;

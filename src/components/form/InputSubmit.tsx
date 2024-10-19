import React from "react";

const InputSubmit = ({ value }: { value: string }) => {
  return (
    <div className="self-center">
      <input
        type="submit"
        value={value}
        className="w-64 h-9 bgBlue text-white self-center md:w-80 md:text-xl rounded-3xl drop-shadow-[0_2px_3px_#212121]"
      />
    </div>
  );
};

export default InputSubmit;

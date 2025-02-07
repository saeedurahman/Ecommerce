import React from "react";

const FormInput = ({
  label,
  type = "text",
  placeholder = "Please Enter",
  name,
  value,
  handleChange,
  error,
}) => {
  return (
    <>
      <div>
        {label && (
          <label htmlFor={name} className="mb-1 block text-sm">
            {label}
          </label>
        )}

        <input
          id={name}
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={handleChange}
          className={`formInput ${
            error ? "border-red-500" : "border-customLightGray"
          }`}
        />
        <p className="text-sm text-red-500">{error || ""}</p>
      </div>
    </>
  );
};

export default FormInput;

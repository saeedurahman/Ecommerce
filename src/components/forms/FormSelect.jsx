import React from "react";

const FormSelect = ({ label, name, value, handleChange, error, children }) => {
  return (
    <>
      <div>
        {label && (
          <label htmlFor={name} className="mb-1 block text-sm">
            {label}
          </label>
        )}

        <select
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          className={`formInput ${
            error ? "border-red-500" : "border-customLightGray"
          }`}
        >
          {children}
        </select>

        <p className="text-sm text-red-500">{error || ""}</p>
      </div>
    </>
  );
};

export default FormSelect;

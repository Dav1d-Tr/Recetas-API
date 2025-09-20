// components/TextAreaField.jsx
import React from "react";

const TextAreaField = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="block font-medium">{label}</label>
      <textarea
        placeholder={`Ingrese el ${label}`}
        value={value}
        onChange={onChange}
        className="input h-[60px] text-[14px] w-full bg-[#09090b] text-[#f4f4f5] px-3 py-1 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out"
        rows="4"
      />
    </div>
  );
};

export default TextAreaField;

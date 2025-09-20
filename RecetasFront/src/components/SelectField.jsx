// components/SelectField.jsx
import React from "react";

const SelectField = ({ label, value, onChange, options = [], required = false }) => {
  return (
    <div>
      <label className="block font-medium">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="input h-[45px] text-[14px] w-full bg-[#09090b] text-[#f4f4f5] px-3 py-1 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out"
        required={required}
      >
        <option value="">-- Seleccionar --</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;

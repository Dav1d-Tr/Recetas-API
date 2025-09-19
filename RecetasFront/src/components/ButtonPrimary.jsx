import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Botón reutilizable con estilos modernos
 * @param {string} label - Texto dentro del botón
 * @param {object} icon - Ícono de FontAwesome (opcional)
 * @param {function} onClick - Acción al hacer clic
 * @param {string} type - Tipo de botón ("button", "submit", "reset")
 */
const ButtonPrimary = ({ label, icon, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="relative px-6 py-2 bg-black text-white text-sm font-semibold rounded-lg border-2 border-purple-500 hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(168,85,247,0.6)] active:scale-95 active:shadow-[0_0_10px_5px_rgba(168,85,247,0.4)] group"
    >
      <span className="flex items-center justify-center gap-2">
        {icon && <FontAwesomeIcon icon={icon} />}
        <span>{label}</span>
      </span>
      <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/20 to-indigo-500/20" />
    </button>
  );
};

export default ButtonPrimary;

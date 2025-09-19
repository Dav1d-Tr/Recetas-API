import React from "react";
import Avatar from "./Avatar"; // importa el componente Avatar
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Comentario = ({ usuario, texto, calificacion }) => {
  return (
    <div className="flex justify-between items-center gap-8 p-6 bg-gray-100 rounded-xl shadow-md">
      <div className="flex gap-4">
        <Avatar />
        <div>
          <h3 className="font-semibold">{usuario}</h3>
          <p className="text-sm text-gray-600">{texto}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
        <em>{calificacion}/5</em>
      </div>
    </div>
  );
};

export default Comentario;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "../components/ButtonPrimary"; 

const ComentarioForm = ({ nuevoComentario, setNuevoComentario, handleSubmit }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 p-4 flex flex-col gap-4 items-center"
    >
      {/* Nombre + Calificación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <input
          className="h-[34px] text-[14px] max-w-full bg-[#09090b] text-[#f4f4f5] px-3 py-1 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out"
          value={nuevoComentario.usuario}
          type="text"
          placeholder="Enter your name..."
          onChange={(e) =>
            setNuevoComentario({
              ...nuevoComentario,
              usuario: e.target.value,
            })
          }
          required
        />

        <select
          className="h-[34px] text-[14px] w-full bg-[#09090b] text-[#f4f4f5] px-3 py-1 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out"
          value={nuevoComentario.calificacion}
          onChange={(e) =>
            setNuevoComentario({
              ...nuevoComentario,
              calificacion: e.target.value,
            })
          }
          required
        >
          <option value="">Selecciona calificación</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
      </div>

      {/* Comentario */}
      <textarea
        placeholder="Escribe tu comentario..."
        value={nuevoComentario.comentario}
        onChange={(e) =>
          setNuevoComentario({
            ...nuevoComentario,
            comentario: e.target.value,
          })
        }
        className="w-full bg-[#09090b] text-[#f4f4f5] px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out h-20 resize-none"
        required
      />

      {/* Botón con ButtonPrimary */}
      <ButtonPrimary
        type="submit"
        label="Enviar comentario"
        icon={faPaperPlane}
      />
    </form>
  );
};

export default ComentarioForm;

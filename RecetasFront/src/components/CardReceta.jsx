import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faPuzzlePiece, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../components/ButtonPrimary"; // 👈 importamos

const CardReceta = ({ receta }) => {
  const navigate = useNavigate(); // 🔥 hook para navegar

  if (!receta) return null;

  return (
    <article className="w-64 h-[350px] rounded-xl bg-zinc-200 overflow-hidden p-4 flex flex-col justify-between shadow-2xl shadow-purple-500 transition-all duration-300 hover:scale-[1.02]">
      <div className="relative w-full h-40">
        <img
          src={
            receta.imagenUrl ||
            "https://static.vecteezy.com/system/resources/previews/052/679/857/non_2x/default-image-icon-missing-picture-page-for-website-design-or-mobile-app-no-photo-available-vector.jpg"
          }
          alt={receta.titulo}
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs px-4 py-1 rounded">
          <em className="text-amber-50 text-sm">
            {receta.categoriaNombre}
          </em>
        </div>
      </div>

      <section className="w-full py-2">
        <div className="text-center">
          <strong className="font-serif text-lg">{receta.titulo}</strong>
        </div>
        <div className="flex justify-around mt-2">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faClock} />
            <em>{receta.tiempoPreparacion || "?"} min</em>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faPuzzlePiece} />
            <em>{receta.dificultad || "N/A"}</em>
          </div>
        </div>
      </section>

      {/* 🔥 Botón que navega a /receta/:id */}
      <ButtonPrimary
        label="View Recipe"
        icon={faUtensils}
        onClick={() => navigate(`/recipe/${receta.id}`)}
      />
    </article>
  );
};

export default CardReceta;

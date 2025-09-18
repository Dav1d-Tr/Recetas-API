import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faPuzzlePiece, faUtensils } from "@fortawesome/free-solid-svg-icons";

const CardReceta = ({ receta }) => {
  if (!receta) return null;

  return (
    <article className="w-64 h-[350px] rounded-xl bg-zinc-200 overflow-hidden p-4 flex flex-col justify-between shadow-2xl shadow-purple-500 transition-all duration-300 hover:scale-[1.02]">
      <div className="relative w-full h-40 ">
        <img
          src={
            receta.imagenUrl ||
            "https://static.vecteezy.com/system/resources/previews/052/679/857/non_2x/default-image-icon-missing-picture-page-for-website-design-or-mobile-app-no-photo-available-vector.jpg"
          }
          alt={receta.titulo}
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute top-2 left-2 bg- bg-purple-500 text-white text-xs px-4 py-1 rounded">
          <em className="text-amber-50 text-sm ">
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
      <button className="relative px-6 py-2 bg-black text-white text-sm font-semibold rounded-lg border-2 border-purple-500 hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(168,85,247,0.6)] active:scale-95 active:shadow-[0_0_10px_5px_rgba(168,85,247,0.4)] group">
        <span className="flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faUtensils} />
          <span>View Recipe</span>
        </span>
        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/20 to-indigo-500/20" />
      </button>
    </article>
  );
};

export default CardReceta;

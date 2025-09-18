import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import Ingrediente from "../components/Ingrediente";

const Crud = () => {
  return (
    <main className="py-24 min-h-screen bg-gradient-to-b from-gray-500 via-gray-300 to-gray-500 flex flex-col items-center gap-10">
      
      {/* Bloque principal */}
      <section className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-28 gap-10">
        
        {/* Imagen + Ingredientes */}
        <div className="w-full max-w-[480px] flex flex-col gap-4 items-center">
          <img
            src="https://cdn.colombia.com/sdi/2019/03/05/recetas-con-pasta-716227.jpg"
            alt="Plato de pasta boloñesa"
            className="w-full h-72 object-cover rounded-xl shadow-lg"
          />
          <article className="bg-gray-300 p-5 rounded-xl shadow-2xl shadow-amber-50 w-full">
            <h3 className="text-center text-xl font-serif font-semibold uppercase">
              Ingredientes
            </h3>
            <div className="grid grid-cols-2 gap-2 mt-2 p-2">
              <Ingrediente />
              <Ingrediente />
              <Ingrediente />
            </div>
          </article>
        </div>

        {/* Descripción de la receta */}
        <article className="w-full max-w-[480px] bg-gray-300 p-5 rounded-xl shadow-2xl shadow-amber-50">
          <div className="mb-4">
            <h2 className="text-2xl font-serif font-semibold uppercase">
              Pasta boloñesa
            </h2>
            <div className="flex mt-2 gap-5 px-2">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} />
                <em>10 min</em>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPuzzlePiece} />
                <em>Fácil</em>
              </div>
            </div>
          </div>
          <p className="text-justify leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia,
            quidem numquam? Vero optio maxime, minus quasi ipsum distinctio
            perspiciatis voluptatum inventore. Veritatis officiis itaque eveniet
            ab incidunt ducimus accusantium alias!
          </p>
        </article>
      </section>

      {/* Sección extra */}
      <section className="w-[1000px] bg-gray-300 p-5 rounded-xl shadow-2xl shadow-amber-50">
        <h1 className="text-xl font-bold text-center">Sección adicional</h1>
      </section>
    </main>
  );
};

export default Crud;

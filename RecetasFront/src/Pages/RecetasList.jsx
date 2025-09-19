import React, { useEffect, useState } from "react";
import CardReceta from "../components/CardReceta";

const RecetasList = () => {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5082/api/Receta")
      .then((res) => res.json())
      .then((data) => setRecetas(data))
      .catch((err) => console.error("Error al cargar recetas:", err));
  }, []);

  if (recetas.length === 0)
    return (
      <p className="text-amber-50 text-center pt-14 text-2xl">
        Cargando recetas...
      </p>
    );

  return (
    <main className="pt-14 min-h-screen bg-gradient-to-b from-gray-500 via-gray-300 to-gray-500">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center p-10">
        {recetas.map((Receta) => (
          <CardReceta key={Receta.id} receta={Receta} />
        ))}
      </section>
    </main>
  );
};

export default RecetasList;

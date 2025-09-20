// RecipeForm.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";
import SelectField from "../components/SelectField";
import MultiSelectField from "../components/MultiSelectField";
import MessageBox from "../components/MessageBox";

const RecipeForm = ({ onSave }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [tiempoPreparacion, setTiempoPreparacion] = useState(0);
  const [dificultad, setDificultad] = useState("Fácil");
  const [imagenUrl, setImagenUrl] = useState("");
  const [ingredientesIds, setIngredientesIds] = useState([]);

  const [categorias, setCategorias] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetch("http://localhost:5082/api/Categoria")
      .then((res) => res.json())
      .then(setCategorias)
      .catch(console.error);

    fetch("http://localhost:5082/api/Ingrediente")
      .then((res) => res.json())
      .then(setIngredientes)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const receta = {
      titulo,
      descripcion,
      categoriaId: parseInt(categoriaId),
      tiempoPreparacion: parseInt(tiempoPreparacion),
      dificultad,
      imagenUrl,
      ingredientesIds,
    };

    try {
      const response = await fetch("http://localhost:5082/api/Receta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receta),
      });

      if (!response.ok) throw new Error("Error al guardar la receta");

      const data = await response.json();
      onSave && onSave(data);

      setMensaje("✅ Receta guardada correctamente");
      setTimeout(() => setMensaje(""), 3000);

      setTitulo("");
      setDescripcion("");
      setCategoriaId("");
      setTiempoPreparacion(0);
      setDificultad("Fácil");
      setImagenUrl("");
      setIngredientesIds([]);
    } catch (err) {
      setMensaje("❌ Hubo un error al guardar la receta");
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  return (
    <main className="py-20 px-4 min-h-screen bg-gradient-to-b from-gray-500 via-gray-300 to-gray-500 flex flex-col items-center gap-5">
      <h2 className="text-2xl font-serif font-bold text-amber-50">Nueva Receta</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-3 items-center px-10 py-5 rounded-lg shadow-2xl shadow-gray-800 bg-gray-500"
      >
        <MessageBox mensaje={mensaje} />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full lg:px-20 gap-4">
          <InputField
            label="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <SelectField
            label="Categoría"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            options={categorias}
            required
          />

          <MultiSelectField
            label="Ingredientes"
            options={ingredientes}
            value={ingredientesIds}
            onChange={setIngredientesIds}
          />

          <InputField
            label="Tiempo de preparación (min)"
            type="number"
            value={tiempoPreparacion}
            min="1"
            onChange={(e) => setTiempoPreparacion(e.target.value)}
            required
          />

          <SelectField
            label="Dificultad"
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
            options={[
              { id: "Fácil", nombre: "Fácil" },
              { id: "Media", nombre: "Media" },
              { id: "Difícil", nombre: "Difícil" },
            ]}
          />

          <InputField
            label="Imagen (URL)"
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
          />

          <TextAreaField
            label="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="relative px-6 py-2 bg-black text-white text-sm font-semibold rounded-lg border-2 border-purple-500 hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(168,85,247,0.6)] active:scale-95 active:shadow-[0_0_10px_5px_rgba(168,85,247,0.4)] group"
        >
          <span className="flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faPaperPlane} />
            <span>Guardar Receta</span>
          </span>
          <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/20 to-indigo-500/20" />
        </button>

      </form>
    </main>
  );
};

export default RecipeForm;

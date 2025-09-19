// src/components/IngredientesSelect.jsx
import React, { useState, useEffect } from "react";

const IngredientesSelect = ({ seleccionados, setSeleccionados }) => {
  const [ingredientes, setIngredientes] = useState([]);

  // 🔹 Cargar ingredientes desde la API
  useEffect(() => {
    const fetchIngredientes = async () => {
      try {
        const res = await fetch("http://localhost:5082/api/Ingrediente"); // Ajusta tu endpoint
        const data = await res.json();
        setIngredientes(data);
      } catch (error) {
        console.error("Error al cargar ingredientes:", error);
      }
    };

    fetchIngredientes();
  }, []);

  // 🔹 Manejar selección múltiple
  const handleChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setSeleccionados(values);
  };

  return (
    <div className="p-4 w-full">
      <label htmlFor="ingredientes" className="block font-semibold mb-2">
        Ingredientes
      </label>
      <select
        id="ingredientes"
        multiple
        value={seleccionados}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg h-40"
      >
        {ingredientes.map((ing) => (
          <option key={ing.id} value={ing.id}>
            {ing.nombre}
          </option>
        ))}
      </select>

      {/* Mostrar seleccionados */}
      <div className="mt-4">
        <p className="font-semibold">Seleccionados:</p>
        <ul className="list-disc list-inside">
          {seleccionados.map((id) => {
            const ing = ingredientes.find((i) => i.id.toString() === id);
            return <li key={id}>{ing?.nombre}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default IngredientesSelect;

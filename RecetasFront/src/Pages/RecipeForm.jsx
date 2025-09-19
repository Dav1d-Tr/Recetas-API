// src/pages/RecipeForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RecipeForm = () => {
  const { id } = useParams(); // si existe, es edición
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tiempoPreparacion, setTiempoPreparacion] = useState("");
  const [dificultad, setDificultad] = useState("Fácil");
  const [imagenUrl, setImagenUrl] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);

  const [ingredientes, setIngredientes] = useState([{ nombre: "" }]);

  // 🔹 Cargar categorías desde API
  useEffect(() => {
    fetch("http://localhost:5082/api/Categoria")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error("Error cargando categorías:", err));
  }, []);

  // 🔹 Si estamos editando, cargar receta existente
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5082/api/Receta/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitulo(data.titulo);
          setDescripcion(data.descripcion);
          setTiempoPreparacion(data.tiempoPreparacion);
          setDificultad(data.dificultad);
          setImagenUrl(data.imagenUrl);
          setCategoriaId(data.categoriaId);
          setIngredientes(data.ingredientes || [{ nombre: "" }]);
        })
        .catch((err) => console.error("Error cargando receta:", err));
    }
  }, [id]);

  // 🔹 Manejo de ingredientes dinámicos
  const handleIngredienteChange = (index, value) => {
    const nuevos = [...ingredientes];
    nuevos[index].nombre = value;
    setIngredientes(nuevos);
  };

  const addIngrediente = () => {
    setIngredientes([...ingredientes, { nombre: "" }]);
  };

  const removeIngrediente = (index) => {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
  };

  // 🔹 Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const receta = {
      titulo,
      descripcion,
      tiempoPreparacion,
      dificultad,
      imagenUrl,
      categoriaId,
      ingredientes,
    };

    try {
      const response = await fetch(
        `http://localhost:5082/api/Receta${id ? `/${id}` : ""}`,
        {
          method: id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(receta),
        }
      );

      if (!response.ok) throw new Error("Error al guardar la receta");

      navigate("/recetas"); // volver a la lista
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al guardar la receta");
    }
  };

  return (
    <main className="py-10 min-h-screen bg-gradient-to-b from-gray-500 via-gray-300 to-gray-500 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">
        {id ? "Editar Receta" : "Nueva Receta"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-[600px] flex flex-col gap-4"
      >
        {/* Título */}
        <input
          type="text"
          placeholder="Título de la receta"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border p-2 rounded"
          required
        />

        {/* Descripción */}
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="border p-2 rounded"
          required
        />

        {/* Tiempo y dificultad */}
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Tiempo (min)"
            value={tiempoPreparacion}
            onChange={(e) => setTiempoPreparacion(e.target.value)}
            className="border p-2 rounded w-1/2"
            required
          />

          <select
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
            className="border p-2 rounded w-1/2"
          >
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>

        {/* Imagen */}
        <input
          type="text"
          placeholder="URL de la imagen"
          value={imagenUrl}
          onChange={(e) => setImagenUrl(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Categoría */}
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">-- Seleccionar Categoría --</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>

        {/* Ingredientes dinámicos */}
        <div>
          <h3 className="font-semibold mb-2">Ingredientes</h3>
          {ingredientes.map((ing, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Nombre del ingrediente"
                value={ing.nombre}
                onChange={(e) =>
                  handleIngredienteChange(index, e.target.value)
                }
                className="border p-2 rounded flex-1"
                required
              />
              <button
                type="button"
                onClick={() => removeIngrediente(index)}
                className="bg-red-500 text-white px-3 rounded"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngrediente}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            + Añadir ingrediente
          </button>
        </div>

        {/* Botón submit */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        >
          {id ? "Actualizar Receta" : "Crear Receta"}
        </button>
      </form>
    </main>
  );
};

export default RecipeForm;

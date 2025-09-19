import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faPuzzlePiece, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Ingrediente from "../components/Ingrediente";
import Comentarios from "../components/Comentarios";
import ComentarioForm from "../components/ComentarioForm";

const Recipe = () => {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);
  const [ingredientes, setIngredientes] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nuevoComentario, setNuevoComentario] = useState({
    usuario: "",
    comentario: "",
    calificacion: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5082/api/Resena`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recetaId: id, // relacionar con la receta actual
          usuario: nuevoComentario.usuario,
          comentario: nuevoComentario.comentario,
          calificacion: parseInt(nuevoComentario.calificacion),
        }),
      });

      if (res.ok) {
        const comentarioCreado = await res.json();
        // actualizar lista sin recargar
        setComentarios((prev) => [...prev, comentarioCreado]);

        // resetear formulario
        setNuevoComentario({ usuario: "", comentario: "", calificacion: "" });
      } else {
        console.error("Error al enviar comentario");
      }
    } catch (err) {
      console.error("Error en la petición:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Cargar receta
        const resReceta = await fetch(`http://localhost:5082/api/Receta/${id}`);
        const dataReceta = await resReceta.json();
        setReceta(dataReceta);

        // 2. Cargar ingredientes
        const resIng = await fetch(
          `http://localhost:5082/api/recetas/${id}/ingredientes`
        );
        if (resIng.ok) {
          const dataIng = await resIng.json();
          setIngredientes(dataIng);
        }

        // 3. Cargar comentarios
        const resCom = await fetch(
          `http://localhost:5082/api/Resena/Receta/${id}`
        );
        if (resCom.ok) {
          const dataCom = await resCom.json();
          setComentarios(dataCom);
        }
      } catch (err) {
        console.error("Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="text-gray-500">Cargando receta...</p>;
  if (!receta) return <p className="text-red-500">No se encontró la receta.</p>;

  return (
    <main className="py-24 px-4 min-h-screen bg-gradient-to-b from-gray-500 via-gray-300 to-gray-500 flex flex-col items-center gap-10">
      {/* Bloque principal */}
      <section className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-28 gap-10">
        {/* Imagen + Ingredientes */}
        <div className="w-full max-w-[480px] flex flex-col gap-4 items-center">
          <img
            src={
              receta.imagenUrl ||
              "https://static.vecteezy.com/system/resources/previews/052/679/857/non_2x/default-image-icon-missing-picture-page-for-website-design-or-mobile-app-no-photo-available-vector.jpg"
            }
            alt={receta.titulo}
            className="w-full h-72 object-cover rounded-xl shadow-lg"
          />
          <article className="bg-gray-300 p-5 rounded-xl shadow-2xl shadow-amber-50 w-full">
            <h3 className="text-center text-xl font-serif font-semibold uppercase">
              Ingredientes
            </h3>
            <div className="grid grid-cols-2 gap-2 mt-2 p-2">
              {ingredientes.length > 0 ? (
                ingredientes.map((ing) => (
                  <Ingrediente key={ing.id} nombre={ing.nombre} />
                ))
              ) : (
                <em>No hay ingredientes registrados</em>
              )}
            </div>
          </article>
        </div>

        {/* Descripción de la receta */}
        <article className="w-full max-w-[480px] bg-gray-300 p-5 rounded-xl shadow-2xl shadow-amber-50">
          <div className="mb-4">
            <h2 className="text-2xl font-serif font-semibold uppercase">
              {receta.titulo}
            </h2>
            <div className="flex mt-2 gap-5 px-2">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} />
                <em>{receta.tiempoPreparacion} min</em>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPuzzlePiece} />
                <em>{receta.dificultad}</em>
              </div>
            </div>
          </div>
          <p className="text-justify leading-relaxed">{receta.descripcion}</p>
        </article>
      </section>

      {/* Sección extra */}
      <section className="w-full max-w-[480px] md:max-w-[700px] lg:max-w-[1000px] bg-gray-300 rounded-xl shadow-2xl shadow-amber-50 p-5">
        <h2 className="text-2xl font-serif font-semibold uppercase mb-4 text-center md:text-left">
          Comentarios
        </h2>
        {/* Formulario para nuevo comentario */}

        {/* Formulario extraído */}
        <ComentarioForm
          nuevoComentario={nuevoComentario}
          setNuevoComentario={setNuevoComentario}
          handleSubmit={handleSubmit}
        />

        <div className="flex flex-col gap-4">
          {comentarios.length > 0 ? (
            comentarios.map((c) => (
              <Comentarios
                key={c.id}
                usuario={c.usuario}
                texto={c.comentario}
                calificacion={c.calificacion}
              />
            ))
          ) : (
            <em>No hay comentarios todavía.</em>
          )}
        </div>
      </section>
    </main>
  );
};

export default Recipe;

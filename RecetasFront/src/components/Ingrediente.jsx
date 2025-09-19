import React from "react";

const Ingrediente = ({ nombre }) => {
  const imgProduct = `/src/assets/${nombre}.png`;

  return (
    <div className="flex items-center gap-2 bg-gray-500 rounded-lg p-1 shadow-md">
      <img src={imgProduct} alt={nombre} className="h-10" />
      <em>{nombre}</em>
    </div>
  );
};

export default Ingrediente;

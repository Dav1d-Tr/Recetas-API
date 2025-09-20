// components/MessageBox.jsx
import React from "react";

const MessageBox = ({ mensaje }) => {
  if (!mensaje) return null;

  return (
    <div
      className={`p-2 rounded text-white ${
        mensaje.includes("✅") ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {mensaje}
    </div>
  );
};

export default MessageBox;

import React from "react";

const Avatar = () => {
  const seed = Math.floor(Math.random() * 1000); // número aleatorio
  const avatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`;

  return (
    <img
      src={avatarUrl}
      alt="Avatar aleatorio"
      className="w-16 h-16 rounded-full border"
    />
  );
};

export default Avatar;

import React from 'react'
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <header className='fixed z-10 w-full h-20 text-white flex items-center justify-center px-5 py-2 '>
        <nav className='flex justify-center items-center w-full h-full bg-purple-400 gap-6 text-2xl font-bold font-serif rounded-2xl inset-shadow-sm inset-shadow-purple-800'>
            <NavLink to="/" href="#">Recetas</NavLink>
            <NavLink to="/crud" href="#">Añadir</NavLink>
        </nav>
    </header>
  )
}

export default Header
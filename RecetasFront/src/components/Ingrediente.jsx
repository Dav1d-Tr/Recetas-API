import React from 'react'
import pasta from '../assets/pasta.png'

const Ingrediente = () => {
  return (
    <div className='flex items-center gap-2 bg-gray-500 rounded-lg p-1 shadow-md shadow-amber-50'>
        <img src={pasta} alt="Pasta" className='h-10'/>
        <em>Pasta</em>
    </div>
  )
}

export default Ingrediente
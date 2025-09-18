import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Recetas from './Pages/Recetas';
import Crud from './Pages/Crud';
import './App.css'

function App() {
  return (
     <Router>
      <Routes>
        {/* Rutas con Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Recetas />} />
          <Route path="/crud" element={<Crud />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

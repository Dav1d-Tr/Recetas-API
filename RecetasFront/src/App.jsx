import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import RecetasList from './Pages/RecetasList';
import Recipe from './Pages/Recipe';
import RecipeForm from './Pages/RecipeForm';

import './App.css'

function App() {
  return (
     <Router>
      <Routes>
        {/* Rutas con Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<RecetasList />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/recipeform" element={<RecipeForm />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

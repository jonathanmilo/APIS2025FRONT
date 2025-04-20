import React from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './secciones/Home'
import { Products } from './secciones/Products'
import { ProductDetail } from './secciones/ProductDetail'
import InicioSesion from './secciones/InicioSesion'

function App() {
  return (
    //  Para agregar mas Paths, usar esto: <Route path="*" element={<Navigate to="/" replace />} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<InicioSesion />} />
      <Route path="/products/:id" element={<ProductDetail />} /> 
    </Routes>
  )
}

export default App

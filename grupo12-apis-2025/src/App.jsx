import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Asegúrate de que Routes y Route están importados
import { Home } from './secciones/Home';
import { Products } from './secciones/Products';
import { ProductDetail } from './secciones/ProductDetail';
import InicioSesion from './secciones/InicioSesion';
import MiPerfil from './secciones/MiPerfil';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/login" element={<InicioSesion />} />
      <Route path="mi-perfil" element={<MiPerfil />} />
    </Routes>
  );
}

export default App;

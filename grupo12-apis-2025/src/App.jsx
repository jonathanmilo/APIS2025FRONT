import React from "react";
import { Routes, Route } from "react-router-dom"; // Asegúrate de que Routes y Route están importados
import { Home } from "./screens/Home";
import { Products } from "./screens/Products";
import { ProductDetail } from "./screens/ProductDetail";
import InicioSesion from "./screens/InicioSesion";
import MiPerfil from "./screens/MiPerfil";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/login" element={<InicioSesion />} />
      <Route path="/profile" element={<MiPerfil />} />
    </Routes>
  );
}

export default App;

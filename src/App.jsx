import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Catalogo from "./screens/Catalogo";
import { ProductDetail } from "./screens/ProductDetail";
import Ingresar from "./screens/Ingresar";
import MiPerfil from "./screens/MiPerfil";
import Layout from "./layouts/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/catalogo/:id" element={<ProductDetail />} />
        <Route path="/ingresar" element={<Ingresar />} />
        <Route path="/mi-perfil" element={<MiPerfil />} />
      </Routes>
    </Layout>
  );
}

export default App;

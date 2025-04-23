import React from "react";
import { Routes, Route } from "react-router-dom"; // Asegúrate de que Routes y Route están importados
import { Home } from "./screens/Home";
import { Products } from "./screens/Products";
import { ProductDetail } from "./screens/ProductDetail";
import Ingresar from "./screens/Ingresar";
import MiPerfil from "./screens/MiPerfil";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/products" element={<Products/>} /> 
      <Route path="/products/:id" element={<Layout><ProductDetail /></Layout>} />
      <Route path="/ingresar" element={<Layout><Ingresar /></Layout>} />
      <Route path="/profile" element={<Layout><MiPerfil /></Layout>} />
    </Routes>
  );
}

export default App;

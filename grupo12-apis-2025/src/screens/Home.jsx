import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel.jsx";
import HomeCarousel from "../components/HomeCarousel.jsx";
import { useProductos } from "../contexts/ProductContext";

import {
  filtrarDestacados,
  filtrarConDescuento,
} from "../utils/filtrarProductos.js";

export function Home() {
  const productos = useProductos();
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [productosConDescuento, setProductosConDescuento] = useState([]);

  useEffect(() => {
    setProductosDestacados(filtrarDestacados(productos));
    setProductosConDescuento(filtrarConDescuento(productos));
  }, [productos]);

  return (
    <>
      <HomeCarousel />

      {productosDestacados.length > 0 && (
        <section className="productos-destacados -mt-32 z-10 relative lg:mx-20">
          <Carousel title="Productos Destacados" items={productosDestacados} />
        </section>
      )}

      <section className="categorias py-15">
        <h2 className="text-xl font-bold mb-2 uppercase text-center text-gray-800">
          Categorías Populares
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-100 py-2">
          {["Electrónica", "Ropa", "Hogar", "Deportes"].map((categoria) => (
            <div
              key={categoria}
              className="categoria-card bg-white p-3 text-center rounded-lg shadow-lg"
            >
              <h3 className="font-bold uppercase text-brand-black">
                {categoria}
              </h3>
              <p className="text-gray-500">Categoría de {categoria}</p>
            </div>
          ))}
        </div>
      </section>

      {productosConDescuento.length > 0 && (
        <section className="productos-descuento mt-8">
          <Carousel
            title="Productos con Descuento"
            items={productosConDescuento}
          />
        </section>
      )}
    </>
  );
}

export default Home;

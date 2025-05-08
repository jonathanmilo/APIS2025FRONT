import React, { useState } from "react";
import Carousel from "../../components/Carousel.jsx";
import { useProductos } from "../../contexts/ProductContext.jsx";
import SearchBar from "./components/SearchBar.jsx";
import ProductCard from "../../components/ProductCard.jsx";

import {
  filtrarPorNombre,
  filtrarDestacados,
} from "../../utils/filtrarProductos.js";

export function Catalogo() {
  const { productos } = useProductos();
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const handleBuscar = (termino) => {
    if (!termino) return setProductosFiltrados([]);
    setProductosFiltrados(filtrarPorNombre(productos, termino));
  };

  const destacados = filtrarDestacados(productos);
  const lista = productosFiltrados.length ? productosFiltrados : productos;

  return (
    <>
      {/* Grid principal */}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-4 p-12 bg-white">
        <div>
          <h1 className="text-xl text-center md:text-left text-brand-black uppercase font-bold">
            Catálogo de productos
          </h1>
          <h2 className="text-gray-500 text-center md:text-left">
            ¡Explorá nuestro catálogo de productos!
          </h2>
        </div>
        <SearchBar buscar={handleBuscar} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-6 w-full">
        {lista.map((prod) => (
          <ProductCard key={prod.id} producto={prod} />
        ))}
      </div>

      {destacados.length > 0 && (
        <section className="mt-4 lg:mx-20">
          <Carousel title="Productos Destacados" items={destacados} />
        </section>
      )}
    </>
  );
}

export default Catalogo;

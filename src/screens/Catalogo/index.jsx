import React, { useState } from "react";
import Carousel from "../../components/Carousel.jsx";
import Producto from "../../components/Producto.jsx";
import { useProductos } from "../../contexts/ProductContext.jsx";
import SearchBar from "./components/SearchBar.jsx";

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
      <div className="mx-5 lg:mx-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-4 my-5">
          <h3 className="text-xl text-center md:text-left text-brand-black uppercase font-bold">
            Catálogo de productos
          </h3>
          <SearchBar buscar={handleBuscar} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {lista.map((prod) => (
            <Producto key={prod._id} producto={prod} />
          ))}
        </div>
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

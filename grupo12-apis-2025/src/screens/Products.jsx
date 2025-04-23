import React, { useState } from "react";
import Carousel from "../components/Carousel.jsx";
import Producto from "../components/Producto.jsx";
import Layout from "../layouts/Layout.jsx";
import { useProductos } from "../contexts/ProductContext";

import {
  filtrarPorNombre,
  filtrarDestacados,
} from "../utils/filtrarProductos.js";

export function Products() {
  const productos = useProductos();
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const handleBuscar = (termino) => {
    if (!termino) return setProductosFiltrados([]);
    setProductosFiltrados(filtrarPorNombre(productos, termino));
  };

  const destacados = filtrarDestacados(productos);
  const lista = productosFiltrados.length ? productosFiltrados : productos;

  return (
    <Layout buscar={handleBuscar}>
      {/* Grid principal */}
      <div className="mx-5 lg:mx-20">
        <h3 className="text-xl pt-6 pb-2 text-brand-black uppercase font-bold">
          Catálogo de productos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {lista.map((prod) => (
            <Producto key={prod.id_producto} producto={prod} />
          ))}
        </div>
      </div>

      {destacados.length > 0 && (
        <section className="mt-4 lg:mx-20">
          <Carousel title="Productos Destacados" items={destacados} />
        </section>
      )}
    </Layout>
  );
}

export default Products;

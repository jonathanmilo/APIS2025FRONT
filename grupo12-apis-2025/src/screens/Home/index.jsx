import React, { useEffect, useState } from "react";
import Carousel from "../../components/Carousel.jsx";
import HomeCarousel from "./components/HomeCarousel.jsx";
import { useProductos } from "../../contexts/ProductContext.jsx";
import { useCategorias } from "../../contexts/CategoryContext.jsx";
import ProductosPorCategoria from "./components/ProductosPorCategoria.jsx";

import {
  filtrarDestacados,
  filtrarConDescuento,
} from "../../utils/filtrarProductos.js";

export function Home() {
  const { productos } = useProductos();
  const { categorias } = useCategorias();

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

      <section className="categorias py-5">
        <ProductosPorCategoria categorias={categorias} productos={productos} />
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

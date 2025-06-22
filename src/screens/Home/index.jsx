import { useEffect, useState } from "react";
import Carousel from "@src/components/Carousel.jsx";
import { useProductos } from "@src/contexts/ProductContext.jsx";
import { useCategorias } from "@src/contexts/CategoryContext.jsx";
import ProductosPorCategoria from "./components/ProductosPorCategoria.jsx";
import Banner from "./components/Banner.jsx";

import {
  filtrarDestacados,
  filtrarConDescuento,
} from "@src/utils/filtrarProductos.js";

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
      <Banner />

      <div className="m-5">
        {productosDestacados.length > 0 && (
          <section className="productos-destacados relative">
            <Carousel
              title="Productos Destacados"
              items={productosDestacados}
            />
          </section>
        )}

        <section className="categorias my-5">
          <ProductosPorCategoria
            categorias={categorias}
            productos={productos}
          />
        </section>

        {productosConDescuento.length > 0 && (
          <section className="productos-descuento mt-5">
            <Carousel
              title="Productos con Descuento"
              items={productosConDescuento}
            />
          </section>
        )}
      </div>
    </>
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import InicioSesion from "./InicioSesion.jsx";
import Header from "../components/Navbar.jsx";
import Carousel from "../components/Carousel.jsx";
import { usarContextoUsuario } from "../contexts/Context.jsx";
import Producto from "../components/Producto.jsx";
import Footer from "../components/Footer.jsx";

export function Products() {
  const usuario = usarContextoUsuario();
  const [logeado, setLogeado] = useState(false);
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then((res) => res.json())
      .then(setProductos)
      .catch(console.error);
  }, []);

  const normalizarTexto = (texto) =>
    texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const handleBuscar = (termino) => {
    if (!termino) {
      setProductosFiltrados([]);
      return;
    }

    const filtrados = productos.filter((producto) =>
      normalizarTexto(producto.nombre).includes(normalizarTexto(termino))
    );
    setProductosFiltrados(filtrados);
  };

  // selecciona sólo los productos en promocion
  const destacados = productos.filter((p) => p.destacado);
  const lista = productosFiltrados.length ? productosFiltrados : productos;

  return (
    <>
      <Header buscar={handleBuscar} />
      {/* Grid principal */}
      {!logeado || usuario ? (
        <>
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
        </>
      ) : (
        <InicioSesion />
      )}

      {destacados.length > 0 && (
        <section className="mt-4 lg:mx-20">
          <Carousel title="Productos Destacados" items={destacados} />
        </section>
      )}

      <Footer></Footer>
    </>
  );
}

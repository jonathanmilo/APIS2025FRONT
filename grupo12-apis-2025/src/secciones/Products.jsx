import React, { useState, useEffect } from "react";
import InicioSesion from "./InicioSesion";
import Header from "../componentes/Header";
import Carousel from "../componentes/Carousel";
import { usarContextoUsuario } from "../Context.jsx";
import Producto from "../componentes/Producto.jsx";
import Footer from "../componentes/Footer.jsx";

export function Products() {
  const usuario = usarContextoUsuario();
  const [logeado, setLogeado] = useState(false);
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then(res => res.json())
      .then(setProductos)
      .catch(console.error);
  }, []);

  const handleBuscar = termino => {
    if (!termino) {
      setProductosFiltrados([]);
      return;
    }
    setProductosFiltrados(
      productos.filter(p =>
        p.nombre.toLowerCase().includes(termino.toLowerCase())
      )
    );
  };

  // selecciona sólo los productos en promocion
  const destacados = productos.filter(p => p.destacado);
  const lista = productosFiltrados.length ? productosFiltrados : productos;

  return (
    <>
      <Header buscar={handleBuscar} />      
      {destacados.length > 0 && (
        <section className="mt-4">
          <Carousel
          title="Productos Destacados"
          items={destacados}/>
        </section>
      )}

      {/* Grid principal */}
      {(!logeado || usuario) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {lista.map(prod => (
            <Producto key={prod.id_producto} producto={prod} />
          ))}
        </div>
      ) : (
        <InicioSesion />
      )}

      <Footer></Footer>
    </>
  );
}

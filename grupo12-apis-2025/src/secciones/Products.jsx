import React, { useState, useEffect } from "react";
import InicioSesion from "./InicioSesion";
import Header from "../componentes/Header";
import { usarContextoUsuario } from "../Context.jsx";
import Producto from "../componentes/Producto.jsx";

export function Products() {
  const usuario = usarContextoUsuario();
  const [logeado, setLogeado] = useState(false);
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  // Cargar productos desde json-server
  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
      });
  }, []);

  const actualizarValor = (nuevoValor) => {
    setLogeado(nuevoValor);
  };

  const handleBuscar = (termino) => {
    if (!termino) {
      setProductosFiltrados([]);
      return;
    }

    const filtrados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(termino.toLowerCase())
    );
    setProductosFiltrados(filtrados);
  };

  const productosAMostrar =
    productosFiltrados.length > 0 ? productosFiltrados : productos;

  return (
    <>
      <Header onActualizarValor={actualizarValor} buscar={handleBuscar} />

      {!logeado || usuario ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2 lg:gap-4 p-3 md:p-5 lg:p-6">
          {productosAMostrar.map((prod) => (
            <Producto key={prod.id_producto} producto={prod} />
          ))}
        </div>
      ) : (
        <InicioSesion />
      )}
    </>
  );
}

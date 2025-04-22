import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import { usarCarrito } from "../contexts/Context"; // Importa el hook del carrito
import Footer from "../components/Footer";

export function ProductDetail() {
  const { id } = useParams(); // Obtener el ID de la URL
  const { agregarAlCarrito } = usarCarrito(); // Obtén la función para agregar al carrito
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1); // Para el selector de cantidad
  const [productosRelacionados, setProductosRelacionados] = useState([]); // Productos de la misma sub-categoría

  useEffect(() => {
    // Cargar producto actual
    fetch("http://localhost:3001/productos")
      .then((res) => res.json())
      .then((data) => {
        const prod = data.find((p) => String(p.id_producto) === id);
        if (prod) {
          setProducto(prod);

          // Filtrar productos de la misma sub-categoría
          const productosDeCategoria = data.filter(
            (p) =>
              p["sub-categoria"] === prod["sub-categoria"] &&
              p.id_producto !== prod.id_producto
          );
          setProductosRelacionados(productosDeCategoria);
        } else {
          setError("Producto no encontrado");
        }
      })
      .catch((err) => setError(err.message));
  }, [id]);

  // Manejadores de error y carga
  if (error) {
    return (
      <>
        <Navbar />
        <div className="p-8 text-center text-red-500">{error}</div>
      </>
    );
  }

  if (!producto) {
    return (
      <>
        <Navbar />
        <div className="p-8 text-center">Cargando producto…</div>
      </>
    );
  }

  // Función para manejar el cambio de cantidad
  const manejarCantidad = (operacion) => {
    if (operacion === "incrementar") {
      setCantidad(cantidad + 1);
    } else if (operacion === "decrementar" && cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  // Función para agregar al carrito con la cantidad seleccionada
  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(producto, cantidad); // Pasa el producto y la cantidad seleccionada
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 md:p-4">
        <Link
          to="/products"
          className="inline-block mb-4 text-lime-500 hover:underline"
        >
          ← Volver a productos
        </Link>

        <div className="flex flex-col lg:flex-row gap-6">
          <img
            src={producto.images[0]}
            alt={producto.nombre}
            className="w-full lg:w-1/2 h-80 object-cover rounded-lg shadow-lg"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 text-black">
              {producto.nombre}
            </h1>
            <p className="text-grey-600 mb-4 text-black">
              {producto.descripcion}
            </p>

            <div className="text-2xl font-semibold mb-4 text-black">
              ${producto.precio}
            </div>

            {producto.descuento > 0 && (
              <p className="mb-4 text-brand-green">
                Descuento: {producto.descuento}%
              </p>
            )}

            <p className="mb-6 text-black">
              Sub-categoría:{" "}
              <span className="font-medium">{producto["sub-categoria"]}</span>
            </p>

            <div className="flex items-center mb-4">
              <button
                onClick={() => manejarCantidad("decrementar")}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                -
              </button>
              <span className="mx-4 text-xl text-black">{cantidad}</span>
              <button
                onClick={() => manejarCantidad("incrementar")}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAgregarAlCarrito} // Llama a la función para agregar al carrito
              className="bg-lime-500 hover:bg-lime-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Agregar al carrito
            </button>
          </div>
        </div>

        {/* Carrusel de productos relacionados */}
        {productosRelacionados.length > 0 && (
          <section className="mt-6">
            <Carousel
              title="Productos similares"
              items={productosRelacionados}
            />
          </section>
        )}
      </div>

      <Footer />
    </>
  );
}

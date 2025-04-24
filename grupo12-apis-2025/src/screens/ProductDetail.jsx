import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import { useCarrito } from "../contexts/CartContext";
import { useCategorias } from "../contexts/CategoryContext";
import { useProductos } from "../contexts/ProductContext";
import GaleriaImagenes from "../components/GaleriaImagenes";

import {
  filtrarRelacionados,
  obtenerNombresSubcategorias,
  obtenerNombreCategoria,
} from "../utils/filtrarProductos";

export function ProductDetail() {
  const { id } = useParams();
  const { productos } = useProductos();
  const { categorias } = useCategorias();

  const { agregarAlCarrito } = useCarrito();

  const [producto, setProducto] = useState(null);
  const [quantity, setCantidad] = useState(1);
  const [productosRelacionados, setProductosRelacionados] = useState([]);

  useEffect(() => {
    if (productos.length > 0) {
      const prod = productos.find((p) => String(p._id) === id);
      if (prod) {
        setProducto(prod);
        setProductosRelacionados(filtrarRelacionados(productos, prod));
      } else {
        setProducto(undefined);
      }
    }
  }, [productos, id]);

  if (producto === undefined) {
    return (
      <div className="p-8 text-center text-red-500">Producto no encontrado</div>
    );
  }

  if (!producto) {
    return <div className="p-8 text-center">Cargando producto…</div>;
  }

  const manejarCantidad = (operacion) => {
    if (operacion === "incrementar") {
      setCantidad((c) => c + 1);
    } else if (operacion === "decrementar" && quantity > 1) {
      setCantidad((c) => c - 1);
    }
  };

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(producto, quantity);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-4">
      <Link
        to="/products"
        className="inline-block mb-4 text-brand-main hover:underline"
      >
        ← Volver a productos
      </Link>

      <div className="flex flex-col lg:flex-row gap-6">
        <GaleriaImagenes images={producto.images} />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-brand-black">
            {producto.title}
          </h1>
          <p className="text-grey-600 mb-4 text-brand-black">
            {producto.description}
          </p>
          <div className="text-2xl font-semibold mb-4 text-brand-black">
            ${producto.price}
          </div>

          {producto.discountPercentage > 0 && (
            <p className="mb-4 text-brand-main">
              Descuento: {producto.discountPercentage}%
            </p>
          )}

          <p className="mb-6 text-brand-black font-bold">
            Categoría:{" "}
            <span className="font-medium">
              {obtenerNombreCategoria(producto, categorias)}
            </span>
          </p>

          <p className="mb-6 text-brand-black font-bold">
            Sub-categorías:{" "}
            <span className="font-medium">
              {obtenerNombresSubcategorias(producto, categorias).join(", ")}
            </span>
          </p>

          <div className="flex items-center mb-4">
            <button
              onClick={() => manejarCantidad("decrementar")}
              className="px-4 py-2 bg-gray-300 text-brand-black rounded-lg cursor-pointer"
            >
              -
            </button>
            <span className="mx-4 text-xl text-brand-black">{quantity}</span>
            <button
              onClick={() => manejarCantidad("incrementar")}
              className="px-4 py-2 bg-gray-300 text-brand-black rounded-lg cursor-pointer"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAgregarAlCarrito}
            className="bg-brand-main hover:bg-brand-main-hover text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      {productosRelacionados.length > 0 && (
        <section className="mt-6">
          <Carousel title="Productos similares" items={productosRelacionados} />
        </section>
      )}
    </div>
  );
}

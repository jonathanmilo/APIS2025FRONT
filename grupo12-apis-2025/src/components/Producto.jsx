import React from "react";
import { Link } from "react-router-dom";
import { usarCarrito } from "../contexts/Context"; // Importa el hook del carrito

function Producto({ producto }) {
  const { agregarAlCarrito } = usarCarrito(); // Obtén la función para agregar al carrito

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-between max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
        {/* Imagen y básico */}
        <div className="relative flex flex-col gap-2">
          <img
            src={producto.images[0]}
            alt={producto.nombre}
            className="w-full h-52 object-cover"
          />
          <div className="px-3">
            <h3 className="text-xl font-bold text-gray-900">
              {producto.nombre}
            </h3>
            <p className="text-gray-500 mt-1 truncate">
              {producto.descripcion}
            </p>
          </div>
        </div>

        {/* Precio, rating y botones */}
        <div className="flex flex-col p-3 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-gray-900">
              ${producto.precio}
            </p>
            <div className="flex items-center gap-1">
              <div className="text-yellow-400">★★★★</div>
              <div className="text-gray-300">★</div>
              <span className="text-sm text-gray-600 ml-1">(42)</span>
            </div>
          </div>

          {/* Botón para agregar al carrito */}
          <button
            className="w-full bg-lime-500 hover:bg-lime-600 text-white font-medium py-3 rounded-lg transition-colors"
            onClick={() => agregarAlCarrito(producto)} // Llama a la función del carrito
          >
            Agregar al carrito
          </button>

          {/* Nuevo botón */}
          <Link
            to={`/products/${producto.id_producto}`}
            className="block text-center underline text-lime-600 hover:text-lime-800"
          >
            Más información
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Producto;

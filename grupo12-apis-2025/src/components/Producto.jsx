import React from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../contexts/CartContext";

function Producto({ producto }) {
  const { agregarAlCarrito } = useCarrito();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-between max-w-sm w-full bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all">
        {/* Imagen y básico */}
        <div className="relative flex flex-col gap-2">
          <img
            src={producto.images[0].url}
            alt={producto.title}
            className="w-full h-52 object-cover"
          />
          <div className="px-3">
            <h3 className="md:text-xl font-bold text-brand-black">
              {producto.title}
            </h3>
            <p className="text-gray-500 text-sm md:text-md mt-1 truncate">
              {producto.description}
            </p>
          </div>
        </div>

        {/* Precio, rating y botones */}
        <div className="flex flex-col p-3 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-brand-black">
              ${producto.price}
            </p>
            <div className="flex items-center gap-1">
              <div className="text-yellow-400">★★★★</div>
              <div className="text-gray-300">★</div>
              <span className="text-sm text-gray-600 ml-1">(42)</span>
            </div>
          </div>

          {/* Botón para agregar al carrito */}
          <button
            className="w-full bg-brand-main hover:bg-brand-main-hover text-white font-medium py-3 rounded-lg transition-colors cursor-pointer"
            onClick={() => agregarAlCarrito(producto)} // Llama a la función del carrito
          >
            Agregar al carrito
          </button>

          {/* Redireccion a userDetail */}
          <Link
            to={`/catalogo/${producto._id}`}
            className="block text-center underline text-brand-main-hover hover:text-lime-700"
          >
            Más información
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Producto;

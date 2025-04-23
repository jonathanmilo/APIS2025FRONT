import React from "react";
import { useCarrito } from "../contexts/CartContext.jsx";

export default function Carrito() {
  const { carrito, eliminarDelCarrito } = useCarrito();

  return (
    <div className="h-[75vh] flex flex-col">
      {/* Contenido scrollable */}
      <div className="overflow-y-auto pr-2 flex-1 no-scrollbar">
        <h2 className="uppercase pb-2 text-brand-black">Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p className="text-brand-gray text-center py-2">
            El carrito está vacío.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {carrito.map((producto) => (
              <li
                key={producto.id_producto}
                className="flex flex-col justify-center h-[15vh] border-t-1 border-brand-light-gray"
              >
                <div className="flex flex-row gap-3">
                  <img
                    src={producto.images[0]}
                    alt={producto.nombre}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex flex-col justify-between h-[10vh]">
                    <h3 className="font-bold text-brand-black">
                      {producto.nombre}
                    </h3>
                    <div>
                      <p className="text-sm text-brand-black">
                        Precio: ${producto.precio}
                      </p>
                      <p className="text-sm text-brand-black">
                        Cantidad: {producto.cantidad}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => eliminarDelCarrito(producto.id_producto)}
                  className="text-red-500 hover:text-red-700 h-3 w-3 self-end cursor-pointer"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Botones fijos abajo (falta subtotal)*/}
      <div className="py-1 border-t mt-2 flex flex-col items-center gap-2 bg-white">
        <button
          className={`px-4 py-2 font-medium rounded-lg transition-colors ${
            carrito.length === 0
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-brand-main hover:bg-brand-main-hover text-white cursor-pointer"
          }`}
          disabled={carrito.length === 0}
        >
          Checkout
        </button>
        <button className="text-brand-gray underline hover:text-brand-black cursor-pointer">
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}

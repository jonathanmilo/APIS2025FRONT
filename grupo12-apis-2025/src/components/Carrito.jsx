import React from "react";
import { usarCarrito } from "../Context";

export default function Carrito() {
  const { carrito, eliminarDelCarrito } = usarCarrito();

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul className="space-y-4">
          {carrito.map((producto) => (
            <li key={producto.id_producto} className="flex items-center gap-4">
              {/* Imagen del producto */}
              <img
                src={producto.images[0]}
                alt={producto.nombre}
                className="w-16 h-16 object-cover rounded"
              />
              {/* Detalles del producto */}
              <div className="flex-1">
                <h3 className="text-md font-semibold">{producto.nombre}</h3>
                <p className="text-sm text-gray-600">Precio: ${producto.precio}</p>
                <p className="text-sm text-gray-600">Cantidad: {producto.cantidad}</p>
              </div>
              {/* Botón para eliminar */}
              <button
                onClick={() => eliminarDelCarrito(producto.id_producto)}
                className="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
import React from "react";
import { usarCarrito } from "../Context";

export default function Carrito() {
  const { carrito, eliminarDelCarrito } = usarCarrito();

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {carrito.map((producto) => (
            <li key={producto.id_producto}>
              {producto.nombre} - Cantidad: {producto.cantidad}
              <button
                onClick={() => eliminarDelCarrito(producto.id_producto)}
                className="ml-2 text-red-500"
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
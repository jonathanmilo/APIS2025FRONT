import React from "react";
import { useCarrito } from "../../../../contexts/CartContext.jsx";
import { useProductos } from "../../../../contexts/ProductContext.jsx";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Carrito() {
  const { carrito, eliminarDelCarrito } = useCarrito();
  const { productos } = useProductos();

  const buscarProducto = (id) => productos.find((p) => p._id === id);

  return (
    <div className="h-[75vh] flex flex-col">
      <div className="overflow-y-auto pr-2 flex-1 no-scrollbar">
        <h2 className="uppercase pb-2 text-brand-black">Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p className="text-brand-gray text-center py-2">
            El carrito está vacío.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {carrito.map((item) => {
              const producto = buscarProducto(item._id);
              if (!producto) return null;

              return (
                <li
                  key={item._id}
                  className="flex flex-col justify-center h-[16vh] border-t-1 border-brand-light-gray"
                >
                  <div className="flex flex-row gap-3">
                    <img
                      src={producto.images?.[0]?.url || "fallback.jpg"}
                      alt={producto.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex flex-col justify-between h-[10vh]">
                      <h3 className="font-bold text-brand-black">
                        {producto.title}
                      </h3>
                      <div>
                        <p className="text-sm text-brand-black">
                          Precio: ${producto.price}
                        </p>
                        <p className="text-sm text-brand-black">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end ">
                    <Tooltip
                      title="Eliminar"
                      onClick={() => eliminarDelCarrito(item._id)}
                    >
                      <IconButton>
                        <RiDeleteBin6Line />
                      </IconButton>
                    </Tooltip>
                  </div>
                </li>
              );
            })}
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

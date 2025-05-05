import React from "react";
import { useCarrito } from "../../../../contexts/CartContext";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { RiDeleteBin6Line } from "react-icons/ri";
import { calcularPrecio } from "../../../../utils/calcularPrecio";

// Función para obtener datos del producto
const getSafeProductData = (item) => {
  return {
    title: item.productData?.title || "Producto no disponible",
    price: item.productData?.price || 0,
    discountPercentage: item.productData?.discountPercentage || 0,
    images: item.productData?.images || [{ url: "/placeholder.jpg" }]
  };
};

export default function Carrito() {
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    actualizarCantidad,
    calcularTotal,
    finalizarCompra,
    loading,
    error
  } = useCarrito();

  if (loading) return <div>Cargando carrito...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const handleCheckout = async () => {
    const success = await finalizarCompra();
    if (success) {
      alert("Compra realizada con éxito!");
    }
  };

  return (
    <div className="h-[75vh] flex flex-col">
      <div className="overflow-y-auto pr-2 flex-1 no-scrollbar">
        <h2 className="uppercase pb-2 text-brand-black">Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p className="text-brand-gray text-center py-2">El carrito está vacío.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {carrito.map((item) => {
              const producto = getSafeProductData(item);
              return (
                <li
                  key={item.productId}
                  className="flex flex-col justify-center h-[16vh] border-t-1 border-brand-light-gray"
                >
                  <div className="flex flex-row gap-3">
                    <img
                      src={producto.images[0].url}
                      alt={producto.title}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.src = "/placeholder.jpg";
                      }}
                    />
                    <div className="flex flex-col justify-between h-[10vh]">
                      <h3 className="font-bold text-brand-black">
                        {producto.title}
                      </h3>
                      <div>
                        <p className="text-sm text-brand-black">
                          Precio: ${calcularPrecio(
                            producto.price, 
                            producto.discountPercentage
                          ).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => actualizarCantidad(item.productId, item.quantity - 1)}
                            className="px-2 bg-gray-200 rounded"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="text-sm text-brand-black">
                            Cantidad: {item.quantity}
                          </span>
                          <button 
                            onClick={() => actualizarCantidad(item.productId, item.quantity + 1)}
                            className="px-2 bg-gray-200 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Tooltip title="Eliminar">
                      <IconButton onClick={() => eliminarDelCarrito(item.productId)}>
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

      {/* Botones fijos abajo */}
      <div className="py-1 border-t mt-2 flex flex-col items-center gap-2 bg-white">
        {carrito.length > 0 && (
          <div className="w-full text-center font-bold">
            Total: ${calcularTotal().toFixed(2)}
          </div>
        )}
        <button
          className={`px-4 py-2 font-medium rounded-lg transition-colors ${
            carrito.length === 0
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-brand-main hover:bg-brand-main-hover text-white cursor-pointer"
          }`}
          disabled={carrito.length === 0}
          onClick={handleCheckout}
        >
          Finalizar Compra
        </button>
        <button 
          className="text-brand-gray underline hover:text-brand-black cursor-pointer"
          onClick={vaciarCarrito}
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}
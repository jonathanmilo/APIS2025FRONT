import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { calcularPrecio } from "@src/utils/calcularPrecio";
import { useContext, useRef } from "react";
import { CartContext } from "@src/contexts/CartContext";
import { useValidacion } from "@src/contexts/AuthContext";
import capu from "/sounds/capusotto.mp3";

export default function Carrito() {
  const auth = useValidacion();
  const navigate = useNavigate();

  const { isAuthenticated } = auth;

  const {
    cart,
    removeFromCart,
    clearCart,
    updateQuantity,
    calcularTotal,
    finalizePurchase,
    loading,
    error,
  } = useContext(CartContext);

  const audioRef = useRef(null);

  function sonidito() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  if (loading)
    return <div className="text-center py-10">Cargando carrito...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">Error: {error}</div>;

  const handleCheckout = async () => {
    if (isAuthenticated) {
      const success = await finalizePurchase();
      if (success) {
        alert("Compra realizada con éxito!");
      }
    } else {
      alert("Debe iniciar sesión para poder finalizar una compra.");
      navigate("/ingresar");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-4">
      <h1 className="mb-5 text-xl text-center text-brand-black uppercase font-bold">
        Carrito de Compras
      </h1>
      <div className="mx-auto max-w-5xl justify-center md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart.length === 0 ? (
            <p className="text-brand-gray text-center py-6 bg-white shadow-md">
              El carrito está vacío.
            </p>
          ) : (
            cart.map((item) => {
              const producto = item.productData;
              return (
                <div
                  key={item.productId}
                  className="mb-6 flex flex-col justify-between bg-white p-6 shadow-md sm:flex-row sm:justify-start"
                >
                  <img
                    src={producto.images[0]?.url}
                    alt={producto.title}
                    onError={(e) => {
                      e.target.src = "/placeholder.jpg";
                    }}
                    className="h-40 sm:w-40 object-contain"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-brand-black dark:text-white">
                        {producto.title}
                      </h2>
                      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        Stock disponible: {producto.stock || "Stock no especificada"}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="cursor-pointer rounded-l bg-gray-100 text-brand-black py-1 px-3.5 duration-100 hover:bg-brand-main hover:text-white disabled:opacity-50"
                        >
                          -
                        </button>

                        <input
                          className="h-8 w-8 bg-white text-brand-black text-center  outline-none"
                          type="number"
                          value={item.quantity}
                          min="1"
                          readOnly
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="cursor-pointer rounded-r bg-gray-100 text-brand-black  py-1 px-3 duration-100 hover:bg-brand-main hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm font-semibold text-gray-700">
                          $
                          {calcularPrecio(
                            producto.price,
                            producto.discountPercentage
                          ).toFixed(2)}
                        </p>
                        <Tooltip title="Eliminar">
                          <IconButton
                            onClick={() => {
                              sonidito(), removeFromCart(item.productId);
                            }}
                          >
                            <RiDeleteBin6Line />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Resumen de compra */}
        {cart.length > 0 && (
          <div className="mt-6 h-full  border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">
                $
                {cart
                  .reduce((sum, item) => {
                    const precio = item.productData?.price || 0;
                    return sum + precio * item.quantity;
                  }, 0)
                  .toFixed(2)}
              </p>
            </div>
            {cart.some((item) => item.productData?.discountPercentage > 0) && (
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Descuentos</p>
                <p className="text-gray-700">
                  -$
                  {cart
                    .reduce((sum, item) => {
                      const precio = item.productData?.price || 0;
                      const descuento =
                        item.productData?.discountPercentage || 0;
                      return sum + precio * (descuento / 100) * item.quantity;
                    }, 0)
                    .toFixed(2)}
                </p>
              </div>
            )}
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold text-brand-black">Total</p>
              <div className="flex flex-col items-end">
                <p className="mb-1 text-lg font-bold text-brand-black">
                  ${calcularTotal().toFixed(2)} USD
                </p>
                <p className="text-xs text-gray-700">Incluye impuestos</p>
              </div>
            </div>

            <audio ref={audioRef} src={capu} />

            <button
              onClick={handleCheckout}
              className="mt-6 w-full rounded-md bg-brand-main py-2 font-medium text-white hover:bg-brand-main-hover"
            >
              Finalizar Compra
            </button>
            <button
              onClick={clearCart}
              className="mt-2 w-full rounded-md bg-gray-200 py-2 text-sm text-gray-700 hover:bg-gray-300"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

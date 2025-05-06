import { createContext, useContext, useState, useEffect } from "react";
import { fetchCarts } from "../api/api";
import { useUsuario } from "./UserContext";

const CartContext = createContext();

export function useCarrito() {
  return useContext(CartContext);
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { usuario } = useUsuario();
  
  const obtenerCarrito = async () => {
    setLoading(true);
    try {
      const data = await fetchCarts();

      const carritoUsuario = data.find((c) => c.userId === usuario._id);

      if (carritoUsuario) {
        const productosNormalizados = carritoUsuario.products.map((item) => ({
          _id: item.productId,
          quantity: item.quantity,
        }));
        setCarrito(productosNormalizados);
      } else {
        setCarrito([]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (usuario) {
      obtenerCarrito();
    } else {
      setCarrito([]);
    }
  }, [usuario]);

  const agregarAlCarrito = (producto, quantity = 1) => {
    setCarrito((prev) => {
      const existente = prev.find((p) => p._id === producto._id);
      if (existente) {
        return prev.map((p) =>
          p._id === producto._id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      return [...prev, { ...producto, quantity }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        obtenerCarrito,
        eliminarDelCarrito,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

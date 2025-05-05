import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchCarts, updateCart, createOrder } from "../api/api";
import { useUsuario } from "./UserContext";
import { calcularPrecio } from "../utils/calcularPrecio";

const CartContext = createContext();

export function useCarrito() {
  return useContext(CartContext);
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { usuario } = useUsuario();

  const obtenerCarrito = useCallback(async () => {
    setLoading(true);
    try {
      if (usuario) {
        const data = await fetchCarts();
        const carritoUsuario = data.find((c) => c.userId === usuario._id);
        setCarrito(carritoUsuario?.products || []);
      } else {
        const localCart = localStorage.getItem('cart');
        setCarrito(localCart ? JSON.parse(localCart) : []);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [usuario]);

const sincronizarCarritoBackend = useCallback(async () => {
  try {
    if (usuario) {
      try {
        await updateCart(usuario._id, carrito);
      } catch (error) {
        // Fallback a localStorage si el backend falla
        localStorage.setItem(`cart_${usuario._id}`, JSON.stringify(carrito));
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(carrito));
    }
  } catch (error) {
    console.error("Error sincronizando carrito:", error);
  }
}, [carrito, usuario]);

const agregarAlCarrito = (producto, quantity = 1) => {
  setCarrito((prev) => {
    const existente = prev.find((p) => p.productId === producto._id);
    const nuevoItem = {
      productId: producto._id,
      quantity: existente ? existente.quantity + quantity : quantity,
      productData: {
        title: producto.title,
        price: producto.price,
        discountPercentage: producto.discountPercentage || 0,
        images: producto.images || []
      }
    };

    const nuevoCarrito = existente
      ? prev.map((p) => (p.productId === producto._id ? nuevoItem : p))
      : [...prev, nuevoItem];

    setTimeout(() => sincronizarCarritoBackend(), 0);
    return nuevoCarrito;
  });
};

  const eliminarDelCarrito = (productId) => {
    setCarrito((prev) => {
      const nuevoCarrito = prev.filter((p) => p.productId !== productId);
      setTimeout(sincronizarCarritoBackend, 0);
      return nuevoCarrito;
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setTimeout(sincronizarCarritoBackend, 0);
  };

  const actualizarCantidad = (productId, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      eliminarDelCarrito(productId);
      return;
    }

    setCarrito((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: nuevaCantidad } : item
      )
    );
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      const precio = item.productData?.price || 0;
      const descuento = item.productData?.discountPercentage || 0;
      return total + (calcularPrecio(precio, descuento) * item.quantity);
    }, 0);
  };

  const finalizarCompra = async () => {
    try {
      if (usuario) {
        await createOrder({
          userId: usuario._id,
          products: carrito,
          total: calcularTotal(),
          date: new Date().toISOString()
        });
        vaciarCarrito();
        return true;
      }
      return false;
    } catch (error) {
      setError("Error al finalizar compra: " + error.message);
      return false;
    }
  };

  useEffect(() => {
    obtenerCarrito();
  }, [usuario, obtenerCarrito]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        actualizarCantidad,
        calcularTotal,
        finalizarCompra,
        obtenerCarrito,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
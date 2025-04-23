import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCarrito() {
  return useContext(CartContext);
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existente = prev.find(
        (p) => p.id_producto === producto.id_producto
      );
      if (existente) {
        return prev.map((p) =>
          p.id_producto === producto.id_producto
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id_producto !== id));
  };

  return (
    <CartContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}
    >
      {children}
    </CartContext.Provider>
  );
}

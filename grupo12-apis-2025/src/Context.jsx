import React, { createContext, useState, useContext } from "react";

// Contextos existentes
const contextoUsuario = createContext();
const validacion = createContext();

// Nuevo contexto para el carrito
const contextoCarrito = createContext();

// Hooks personalizados para usar los contextos
export function cambiarUsuario() {
  return useContext(validacion);
}

export function usarContextoUsuario() {
  return useContext(contextoUsuario);
}

export function usarCarrito() {
  return useContext(contextoCarrito);
}

// Componente proveedor del contexto
export function Context({ children }) {
  // Estado para el usuario
  const [usuarioRegistrado, registrar] = useState(null);

  // Estado para el carrito
  const [carrito, setCarrito] = useState([]);

  // Validar usuario
  const validar = async (usuario) => {
    const response = await fetch('/usuarios_datos.json');
    const data = await response.json();

    const usuarioExistente = data.usuarios.filter(
      (u) => u.password === usuario.password && u.mail === usuario.mail
    );

    if (usuarioExistente.length > 0) {
      registrar(usuarioExistente[0]);
    }
  };

  // Funciones para manejar el carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find((p) => p.id_producto === producto.id_producto);
      if (productoExistente) {
        return prevCarrito.map((p) =>
          p.id_producto === producto.id_producto
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id_producto) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((p) => p.id_producto !== id_producto)
    );
  };

  return (
    <contextoUsuario.Provider value={usuarioRegistrado}>
      <validacion.Provider value={validar}>
        <contextoCarrito.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
          {children}
        </contextoCarrito.Provider>
      </validacion.Provider>
    </contextoUsuario.Provider>
  );
}
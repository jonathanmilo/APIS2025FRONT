import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllProducts } from "@src/api/products";
import { deleteProduct, updateProduct, createProduct } from "@src/api/products";

const ProductContext = createContext();

export function useProductos() {
  return useContext(ProductContext);
}

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProductos = async () => {
    try {
      const prods= await fetch(`http://localhost:8080/products`, {
      
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //Authorization: 'Bearer '+user.token, // Asegúrate de que el token esté en el contexto de usuario          

        },});
      
      if (prods.ok) {
        const data = await prods.json();
        setProductos(data);
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshProductos = () => {
    getProductos();
  };

  const eliminarProducto = async (id) => {
    try {
      await deleteProduct(id);
      refreshProductos();
      return { success: true };
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return { success: false, error };
    }
  };

  const crearProducto = async (userId, nuevoProducto) => {
    if (!userId) throw new Error("No hay usuario logueado");
    try {
      await createProduct(nuevoProducto);
      refreshProductos();
    } catch (err) {
      throw err;
    }
  };

  const actualizarProducto = async (id, data) => {
    try {
      await updateProduct(id, data);
      refreshProductos();
    } catch (error) {
      throw new Error("Error al actualizar el producto");
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        productos,
        loading,
        error,
        eliminarProducto,
        actualizarProducto,
        crearProducto,
        refreshProductos,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

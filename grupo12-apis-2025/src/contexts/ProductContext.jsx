import { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts } from "../api/api";

const ProductContext = createContext();

export function useProductos() {
  return useContext(ProductContext);
}

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProductos = async () => {

    setLoading(true);
    try {
      const data = await fetchProducts();
      setProductos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <ProductContext.Provider value={{ productos }}>
      {children}
    </ProductContext.Provider>
  );
}

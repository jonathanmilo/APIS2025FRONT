import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export function useProductos() {
  return useContext(ProductContext);
}

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then((res) => res.json())
      .then(setProductos)
      .catch(console.error);
  }, []);

  return (
    <ProductContext.Provider value={productos}>
      {children}
    </ProductContext.Provider>
  );
}

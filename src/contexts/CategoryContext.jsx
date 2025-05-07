import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllCategories } from "../api/categories";

const CategoryContext = createContext();

export function useCategorias() {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarCategorias = async () => {
    try {
      const res = await fetchAllCategories();
      setCategorias(res.data); 
    } catch (err) {
      console.error("Error al obtener categorías:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <CategoryContext.Provider value={{ categorias, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
}
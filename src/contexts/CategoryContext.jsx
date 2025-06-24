import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllCategories } from "@src/api/categories";
import { useValidacion } from "./AuthContext";

const CategoryContext = createContext();

export function useCategorias() {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }) {
  const { user } = useValidacion();
  
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarCategorias = async () => {
    try {
       const response = await fetch(`http://localhost:8080/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
         // Authorization: 'Bearer '+user.token, // Asegúrate de que el token esté en el contexto de usuario          

        },
        
      });
       if (response.ok) {
            const data = await response.json();
            setCategorias(data); 
      }


      
      //setCategorias(res.data); 
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
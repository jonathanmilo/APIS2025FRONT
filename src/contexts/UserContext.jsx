import { createContext, useContext, useState, useEffect } from "react";
import { fetchAllUsers } from "@src/api/users";

const UserContext = createContext();

export function useUsuario() {
  return useContext(UserContext);
}

export function UsuarioProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await fetchAllUsers();
        setUsuarios(res.data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarUsuarios();
  }, []);

  return (
    <UserContext.Provider value={{ usuarios, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

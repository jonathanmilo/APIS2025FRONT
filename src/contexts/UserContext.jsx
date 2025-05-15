import { createContext, useContext, useState, useEffect } from "react";
import { fetchAllUsers } from "@src/api/users";

const UserContext = createContext();

export function useUsuario() {
  return useContext(UserContext);
}

export function UsuarioProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);

  const cargarUsuarios = async () => {
    setIsLoading(true);
    try {
      const res = await fetchAllUsers();
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const refreshUsers = () => {
    cargarUsuarios();
  };

  const actualizarUsuario = async () => {
    try {
      refreshUsers();
      return { success: true };
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return { success: false, error };
    }
  };

  return (
    <UserContext.Provider
      value={{ usuarios, isLoading, cargarUsuarios, actualizarUsuario }}
    >
      {children}
    </UserContext.Provider>
  );
}

import { createContext, useContext, useState, useEffect } from "react";
import { fetchUsers } from "../api/api";

const UserContext = createContext();

export function useUsuario() {
  return useContext(UserContext);
}

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // usuario actual
  const [usuarios, setUsuarios] = useState([]); // todos los usuarios

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await fetchUsers();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    cargarUsuarios();
  }, []);

  return (
    <UserContext.Provider value={{ usuario, setUsuario, usuarios }}>
      {children}
    </UserContext.Provider>
  );
}

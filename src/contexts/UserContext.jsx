import { createContext, useContext, useState, useEffect } from "react";
import { fetchAllUsers } from "../api/users";

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
        const res = await fetchAllUsers();
        setUsuarios(res.data);
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

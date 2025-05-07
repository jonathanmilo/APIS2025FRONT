import { createContext, useContext, useState } from "react";
import { useUsuario } from "./UserContext";
import { fetchAllUsers } from "../api/users";

const AuthContext = createContext();

export function useValidacion() {
  return useContext(AuthContext);
}

export function ValidacionProvider({ children }) {
  const { setUsuario } = useUsuario();
  const [usuario, setUsuarioLocal] = useState(null);

  const validar = async (usuario) => {
    try {
      const res = await fetchAllUsers();

      const encontrado = res.data.find(
        (u) => u.email === usuario.email && u.password === usuario.password
      );

      if (encontrado) {
        setUsuario(encontrado);
        setUsuarioLocal(encontrado);
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al validar usuario:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ validar, usuario }}>
      {children}
    </AuthContext.Provider>
  );
}

import { createContext, useContext, useState } from "react";
import { useUsuario } from "./UserContext";

const AuthContext = createContext();

export function useValidacion() {
  return useContext(AuthContext);
}

export function ValidacionProvider({ children }) {
  const { setUsuario } = useUsuario();
  const [usuario, setUsuarioLocal] = useState(null);

  const validar = async (usuario) => {
    try {
      const response = await fetch("http://localhost:3001/usuarios");
      const data = await response.json();

      const encontrado = data.find(
        (u) => u.mail === usuario.mail && u.password === usuario.password
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

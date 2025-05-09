import { createContext, useContext, useReducer } from "react";
import { authReducer, initialState } from "@src/reducers/authReducer";
import { useUsuario } from "./UserContext";

const AuthContext = createContext();

export function useValidacion() {
  return useContext(AuthContext);
}

export function ValidacionProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { usuarios } = useUsuario();
  const login = (usuario) => {
    dispatch({ type: "LOGIN", payload: usuario });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const validar = async (credentials) => {
    try {
      const encontrado = usuarios.find(
        (user) =>
          user.email === credentials.email &&
          user.password === credentials.password
      );

      if (encontrado) {
        login(encontrado);
        return true;
      } else {
        alert("Credenciales incorrectas");
        return false;
      }
    } catch (error) {
      console.error("Error al validar usuario:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, validar }}>
      {children}
    </AuthContext.Provider>
  );
}

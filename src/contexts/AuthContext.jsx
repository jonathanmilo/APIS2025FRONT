import { createContext, useContext, useReducer } from "react";
import { authReducer, initialState } from "@src/reducers/authReducer";
import { useUsuario } from "./UserContext";
import { createUser } from "../api/users";

const AuthContext = createContext();

export function useValidacion() {
  return useContext(AuthContext);
}

export function ValidacionProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { usuarios, cargarUsuarios } = useUsuario();

  const login = (usuario) => {
    const { password, ...usuarioSeguro } = usuario; // excluir contraseña para que no figure en LocalStorage (temporal)
    const token = "fake-jwt-token"; // token hardcodeado
    const payload = { ...usuarioSeguro, token };

    dispatch({ type: "LOGIN", payload });
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

  const register = async (userData) => {
    const existingUser = usuarios.find((user) => user.email === userData.email);
    if (existingUser) {
      alert("El correo ya está registrado.");
      return false;
    }

    try {
      await createUser(userData);
      alert("Usuario registrado exitosamente.");

      if (cargarUsuarios) {
        await cargarUsuarios();
      }

      return true;
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      alert("Hubo un error al registrar el usuario.");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, validar, register, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

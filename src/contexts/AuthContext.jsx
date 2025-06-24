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
//  const { usuarios, cargarUsuarios } = useUsuario();

const login = (data) => {
  const { access_token, refresh_token, ...usuarioSeguro } = data;

  localStorage.setItem("token", access_token);

  const payload = {
    refresh_token,
    user: usuarioSeguro,
    token: access_token,
  };

  dispatch({ type: "LOGIN", payload });
  alert("Bienvenido " + usuarioSeguro.username);
};


  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const validar = async (credentials) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        login(data);
        return true;
      } else {
              alert("Credenciales incorrectas");
              console.error('Error en login', response.status);
        return false;
      }
    } catch (error) {
      alert("Error en la petición");
    console.error('Error en la petición:', error);
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

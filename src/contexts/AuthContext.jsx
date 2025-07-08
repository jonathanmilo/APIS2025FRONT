import { createContext, useContext, useReducer } from "react";
import { authReducer, initialState } from "@src/reducers/authReducer";
import { getProfile } from "../api/users";

const AuthContext = createContext();

export function useValidacion() {
  return useContext(AuthContext);
}

export function ValidacionProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (response) => {
    const token = response.data.access_token;

    try {
      const { data: user } = await getProfile(); 
      const payload = { ...user, token };

      localStorage.setItem("user", JSON.stringify(payload));
      localStorage.setItem("token", token); 

      dispatch({ type: "LOGIN", payload });
    } catch (error) {
      console.error("Error obteniendo el perfil:", error);
      logout(); 
    }
  };
  
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const validar = async (response) => {
    login(response);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, validar, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

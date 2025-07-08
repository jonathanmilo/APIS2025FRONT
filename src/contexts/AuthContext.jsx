import { createContext, useContext, useReducer } from "react";
import { authReducer, initialState } from "@src/reducers/authReducer";
import { getProfile } from "../api/users";
import { logout as logoutApi } from "../api/auth";

const AuthContext = createContext();

export function useValidacion() {
  return useContext(AuthContext);
}

export function ValidacionProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const validar = async (response) => {
    const token = response.data.access_token;

    try {
      localStorage.setItem("token", token);
      
      const { data: user } = await getProfile();
      const payload = { ...user, token };
      
      localStorage.setItem("user", JSON.stringify(payload));

      dispatch({ type: "LOGIN", payload });

      return user.id;
    } catch (error) {
      console.error("Error obteniendo el perfil:", error);
      logout();
    }
  };

  const logout = async () => {
    try {
      await logoutApi(); 
    } catch (error) {
      console.warn("Error comunicando logout al backend:", error);
    }

    dispatch({ type: "LOGOUT" });
  };
  
  return (
    <AuthContext.Provider
      value={{ ...state, logout, validar, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

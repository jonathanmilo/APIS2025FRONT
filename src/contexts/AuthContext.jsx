import { createContext, useContext, useState } from "react";
import { useUsuario } from "./UserContext";
import { fetchUsers } from "../api/api";
import { SignJWT } from 'jose';


const AuthContext = createContext();

export function useValidacion() {
  return useContext(AuthContext);
}

export function ValidacionProvider({ children }) {
  const { usuario, authToken, login, logout } = useUsuario();
  
  const validar = async (usuarioInput) => {

    try {
      const data = await fetchUsers();

      const encontrado = data.find(
        (u) => u.email === usuarioInput.email && u.password === usuarioInput.password
      );

      if (encontrado) {

        const secret = new TextEncoder().encode(
           'fallback-secreto-minimo-32-chars-1234567890'
        );
        
        // 2. Configurar la fecha de expiración (3 horas)
        const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 3;
        
        // 3. Crear el token JWT
        const jwt = await new SignJWT({
          id: encontrado.id,
          email: encontrado.email,
          firstName: encontrado.firstName,
          username: encontrado.username,
          avatar: encontrado.avatar,
          address: encontrado.address,

        })
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime(exp)
          .sign(secret);

        login(jwt);

      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al validar usuario:", error);
      alert("Error durante la autenticación");
    }
  };

  return (
    <AuthContext.Provider value={{ validar ,usuario, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
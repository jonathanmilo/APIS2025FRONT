import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUsuario() {
  return useContext(UserContext);
}

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null); 

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
}

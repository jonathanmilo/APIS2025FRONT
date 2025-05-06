import { createContext, useContext, useState ,useEffect} from "react";
import { jwtDecode } from 'jwt-decode';  // Importación directa de la función
export const UserContext = createContext();

export function useUsuario() {
  return useContext(UserContext);
}


export function UsuarioProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [usuario, setUsuario] = useState(null);

   function transformarToken(token){
      const u={ 
      id: jwtDecode(token).id,
      email: jwtDecode(token).email,
      firstName: jwtDecode(token).firstName,
      username: jwtDecode(token).username,
      avatar: jwtDecode(token).avatar,
      address: jwtDecode(token).address,}
      
      return u
   }

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && token !== 'undefined') {
      setAuthToken(token);

      setUsuario(transformarToken(token));
      console.log(usuario)

    }
    else {
      setAuthToken(null);
      setUsuario(null);
    }
  }, []);
  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);

    setUsuario(transformarToken(token));

  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setUsuario(null);
  };

  return (
    <UserContext.Provider value={{ usuario, authToken, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

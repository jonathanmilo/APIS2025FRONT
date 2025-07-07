import { useState, useEffect } from "react";

export function useUserData(userId, usuarios) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchUser = () => {
      try {
        const usuarioEncontrado = usuarios.find((u) => u.id === userId);
        if (usuarioEncontrado) {
          setUsuario(usuarioEncontrado);
        } else {
          throw new Error("Usuario no encontrado");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, usuarios]);

  return { usuario, loading, error };
}

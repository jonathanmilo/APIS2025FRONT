import { useState, useEffect } from "react";
import { getUserData } from "../services/UserService";

export function useUserData(userId) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    getUserData(userId)
      .then((data) => setUsuario(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [userId]);

  return { usuario, loading, error };
}

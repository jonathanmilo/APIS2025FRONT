import { Outlet, Navigate } from "react-router-dom";
import { useValidacion } from "@src/contexts/AuthContext";

const ProtectedRoutes = () => {
  const { user } = useValidacion();
  return user? <Outlet /> : <Navigate to="/Ingresar" />; 
};

export default ProtectedRoutes;

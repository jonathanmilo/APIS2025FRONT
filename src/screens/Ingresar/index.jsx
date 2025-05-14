import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import { useValidacion } from "@src/contexts/AuthContext";
import { CartContext } from "@src/contexts/CartContext";

export default function Ingresar() {
  const { validar, user } = useValidacion();
  const { obtenerCarrito } = useContext(CartContext);
  const navigate = useNavigate();
  const [formMode, setFormMode] = useState("login");
  const [loginExitoso, setLoginExitoso] = useState(false);

  const handleSubmit = async (data) => {
    if (formMode === "login") {
      await validar(data);
      setLoginExitoso(true);
    } else {
      alert(`Cuenta creada para ${data.name}`);
      navigate("/ingresar");
    }
  };

  useEffect(() => {
    if (loginExitoso && user) {
      obtenerCarrito();
      alert(`Bienvenido ${user.name || "usuario"}!`);
      navigate("/");
    }
  }, [loginExitoso, user]);

  const toggleFormMode = () => {
    setFormMode((prev) => (prev === "login" ? "register" : "login"));
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex-grow flex flex-col items-center min-h-screen p-10">
      <div className="relative flex flex-col bg-transparent text-black">
        <AuthForm mode={formMode} onSubmit={handleSubmit} />

        <div className="flex items-center justify-center w-full gap-4 my-6 px-4">
          <div className="h-px flex-1 bg-gray-300 dark:text-white" />
          <span className="text-gray-400 text-sm dark:text-white">
            {formMode === "login"
              ? "¿No tenés una cuenta?"
              : "¿Ya tenés una cuenta?"}
          </span>
          <div className="h-px flex-1 bg-gray-300 dark:text-white" />
        </div>

        <button
          className="block w-full shadow-lg bg-gray-50 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-gray border border-gray-300 hover:bg-gray-100"
          onClick={toggleFormMode}
        >
          {formMode === "login" ? "Registrate" : "Iniciar sesión"}
        </button>
      </div>
    </div>
  );
}

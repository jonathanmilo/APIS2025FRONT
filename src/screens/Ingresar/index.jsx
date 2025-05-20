import { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

export default function Ingresar() {
  const [formMode, setFormMode] = useState("login");

  const toggleFormMode = () => {
    setFormMode((prev) => (prev === "login" ? "register" : "login"));
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex-grow flex flex-col items-center min-h-screen p-10">
      <div className="relative flex flex-col bg-transparent text-black">

        {formMode === "login" ? (
          <LoginForm />
        ) : (
          <RegisterForm setFormMode={setFormMode} />
        )}

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

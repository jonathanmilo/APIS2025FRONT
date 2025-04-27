import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useValidacion } from "../contexts/AuthContext";

export default function Ingresar() {
  const { validar } = useValidacion();
  const navigate = useNavigate();
  const [formMode, setFormMode] = useState("login");

  const handleSubmit = (data) => {
    if (formMode === "login") {
      validar(data);
      alert(`Bienvenido ${data.name || "usuario"}!`);
      navigate("/");
    } else {
      alert(`Cuenta creada para ${data.name}`);
      navigate("/ingresar");
    }
  };

  const toggleFormMode = () => {
    setFormMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center my-10">
      <div className="relative flex flex-col bg-transparent text-brand-black">
        <AuthForm mode={formMode} onSubmit={handleSubmit} />

        <div className="flex items-center justify-center w-full gap-4 my-6 px-4">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-gray-400 text-sm">
            {formMode === "login"
              ? "¿No tenés una cuenta?"
              : "¿Ya tenés una cuenta?"}
          </span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <button
          className="block w-full shadow-lg bg-gray-50 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-brand-gray border border-gray-300 hover:bg-gray-100"
          onClick={toggleFormMode}
        >
          {formMode === "login" ? "Registrate" : "Iniciar sesión"}
        </button>
      </div>
    </div>
  );
}

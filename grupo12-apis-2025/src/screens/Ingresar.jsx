import React, { useState } from "react";
import { cambiarUsuario } from "../contexts/Context.jsx";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";

const Ingresar = () => {
  const validar = cambiarUsuario();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [formMode, setFormMode] = useState("login");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: !/^\S+@\S+\.\S+$/.test(value),
      }));
    }
    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: value.length < 6,
      }));
    }
  };

  const handleSubmit = (data) => {
    if (!data.email || !data.password || errors.email || errors.password) {
      alert("Por favor completa todos los campos correctamente");
      return;
    }

    validar(data);
    alert(`Bienvenido ${data.nombre || "usuario"}!`);
    navigate("/");
  };

  const toggleFormMode = () => {
    setFormMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <div className="w-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center my-10">
        <div className="relative flex flex-col bg-transparent text-brand-black">
          <AuthForm mode={formMode} onSubmit={handleSubmit} />

          {/* Solo muestra esto si está en modo login */}
          {formMode === "login" && (
            <>
              <div className="flex items-center justify-center w-full gap-4 my-6 px-4">
                <div className="h-px flex-1 bg-gray-300" />
                <span className="text-gray-400 text-sm">o</span>
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              <button className="flex self-center gap-1 bg-white border border-gray-200 shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  alt="Google"
                  className="h-6 w-6"
                />
                <span>Continuar con Google</span>
              </button>
            </>
          )}

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
            className="block w-full shadow-lg bg-gray-50 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-gray-600 border border-gray-300 hover:bg-gray-100"
            onClick={toggleFormMode}
          >
            {formMode === "login" ? "Registrate" : "Iniciar sesión"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ingresar;

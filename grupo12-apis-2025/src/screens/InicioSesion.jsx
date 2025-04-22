import React, { useState } from "react";
import { usarContextoUsuario, cambiarUsuario } from "../contexts/Context.jsx";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";

const InicioSesion = ({ registro }) => {
  const validar = cambiarUsuario();
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  // Estado para errores
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validación en tiempo real
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

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      errors.email ||
      errors.password
    ) {
      alert("Por favor completa todos los campos correctamente");
      return;
    }

    validar(formData);
    console.log("Datos enviados:", formData);
    alert(`Bienvenido ${formData.nombre || "usuario"}!`);

    navigate("/");
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <Navbar></Navbar>
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="relative flex flex-col bg-transparent bg-clip-border text-gray-700 shadow-none">
            <h4 className="block text-center font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Iniciar Sesión
            </h4>
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleSubmit}
            >
              <div className="mb-4 flex flex-col gap-6">
                {/* Campo Email */}
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    type="email"
                    className={`peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder=" "
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email*
                  </label>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Campo Contraseña */}
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    type="password"
                    className={`peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder=" "
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Contraseña*
                  </label>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Botón de envío */}
              <button
                className="mt-6 block w-full select-none bg-lime-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:drop-shadow-brand-green-hover focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
                disabled={errors.email || errors.password}
              >
                Ingresar
              </button>
            </form>

            {/* Separador */}

            <div className="flex items-center justify-center w-full gap-4 my-6 px-4">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-gray-400 text-sm">o</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            {/* Botón de google */}

            <button class="flex self-center gap-1 bg-white border border-gray-200 shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt=""
                className="h-6 w-6"
              />
              <span>Continuar con Google</span>
            </button>

            {/* Separador */}

            <div className="flex items-center justify-center w-full gap-4 my-6 px-4">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-gray-400 text-sm">
                ¿No tenés una cuenta?
              </span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            {/* Botón de registro */}

            <button
              className="block w-full select-none shadow-lg bg-gray-50 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-400 border-gray-300 border-1 hover:bg-gray-100 cursor-pointer"
              type="submit"
            >
              Registrate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InicioSesion;

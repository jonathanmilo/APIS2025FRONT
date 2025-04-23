import React, { useState } from "react";

export default function AuthForm({ mode = "login", onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "", // ← Nuevo campo
  });

  const [errors, setErrors] = useState({});

  const isRegister = mode === "register";

  const validate = () => {
    const newErrors = {};
    if (isRegister && !formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }
    if (isRegister && !formData.lastname.trim()) {
      newErrors.lastname = "El apellido es obligatorio.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es obligatoria.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center max-w">
      <div className="relative flex flex-col bg-transparent text-gray-700">
        <h4 className="text-xl font-semibold text-blue-gray-900">
          {isRegister ? "Crear Cuenta" : "Iniciar Sesión"}
        </h4>

        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            {isRegister && (
              <>
                <InputField
                  id="name"
                  label="Nombre*"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <InputField
                  id="lastname"
                  label="Apellido*"
                  type="text"
                  value={formData.lastname}
                  onChange={handleChange}
                  error={errors.lastname}
                />
              </>
            )}
            <InputField
              id="email"
              label="Email*"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              id="password"
              label="Contraseña*"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>

          <button
            className="mt-6 w-full bg-lime-500 py-3 px-6 text-white font-bold uppercase shadow-md transition-all hover:shadow-lg"
            type="submit"
            disabled={Object.keys(errors).length > 0}
          >
            {isRegister ? "Registrarse" : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({ id, label, type, value, onChange, error }) {
  return (
    <div className="relative h-11 w-full min-w-[200px]">
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder=" "
        required
        className={`peer h-full w-full rounded-md border px-3 py-3 text-sm text-blue-gray-700 bg-transparent focus:border-2 focus:border-pink-500 outline-none ${
          error ? "border-red-500" : "border-blue-gray-200"
        }`}
      />
      <label
        htmlFor={id}
        className="absolute left-0 -top-1.5 text-[11px] text-blue-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 peer-focus:text-pink-500"
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
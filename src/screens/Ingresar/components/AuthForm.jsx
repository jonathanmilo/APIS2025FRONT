import { useState } from "react";
import { TextField } from "@mui/material";

export default function AuthForm({ mode = "login", onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (isRegister) {
        const newUser = {
          id: Date.now().toString(),
          username: `${formData.name.toLowerCase()}${formData.lastname.toLowerCase()}`,
          email: formData.email,
          password: formData.password,
          firstName: formData.name,
          lastName: formData.lastname,
          address: {
            street: "",
            state: "",
            country: "",
          },
          avatar: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        onSubmit(newUser);
      } else {
        onSubmit(formData); // Para login, simplemente pasa los datos al padre
      }
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center max-w">
      <div className="relative flex flex-col bg-transparent text-black dark:text-white">
        <h4 className="text-2xl text-center font-semibold text-black dark:text-white">
          {isRegister ? "Registrate" : "Ingresar"}
        </h4>

        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-1">
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
            className="mt-6 w-full bg-primary py-3 px-6 text-white font-bold uppercase shadow-md transition-all hover:shadow-lg"
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
    <TextField
      fullWidth
      variant="outlined"
      margin="dense"
      id={id}
      name={id}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error}
    />
  );
}

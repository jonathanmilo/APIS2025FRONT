export const validateField = (name, value, rules = {}, formData = {}) => {
  const rule = rules[name];
  if (!rule) return "";
  return rule(value, formData);
};

export const validateForm = (formData, rules = {}) => {
  const errors = {};
  for (const [name, value] of Object.entries(formData)) {
    const error = validateField(name, value, rules, formData);
    if (error) errors[name] = error;
  }
  return errors;
};

export const getAuthValidationRules = (isRegister) => ({ // TODO: validar que el usuario no ingrese números en name y lastname
  name: (val) =>
    isRegister && !val.trim() ? "El nombre es obligatorio." : "",
  lastname: (val) =>
    isRegister && !val.trim() ? "El apellido es obligatorio." : "",
  email: (val) => {
    if (!val.trim()) return "El email es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(val)) return "Email inválido.";
    return "";
  },
  password: (val) => // TODO(opcional): validar longitud mínima de contraseña a la hora de registrarse
    !val.trim() ? "La contraseña es obligatoria." : "",
});
import * as yup from "yup";

const noNumbersRegex = /^[^\d]+$/;

export const emailField = {
  name: "email",
  label: "Email*",
  type: "email",
};

export const passwordField = {
  name: "password",
  label: "Contraseña*",
  type: "password",
};

export const nameField = {
  name: "name",
  label: "Nombre*",
  type: "text",
};

export const lastnameField = {
  name: "lastname",
  label: "Apellido*",
  type: "text",
};

export const emailValidation = yup
  .string()
  .email("Email inválido")
  .required("Email es obligatorio");

export const passwordValidation = yup
  .string()
  .min(6, "Mínimo 6 caracteres")
  .required("Contraseña obligatoria");

export const nameValidation = yup
  .string()
  .matches(noNumbersRegex, "El nombre no puede contener números")
  .required("El nombre es obligatorio");

export const lastnameValidation = yup
  .string()
  .matches(noNumbersRegex, "El apellido no puede contener números")
  .required("El apellido es obligatorio");
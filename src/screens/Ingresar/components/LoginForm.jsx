import * as yup from "yup";
import Form from "@src/components/forms/Form";
import { useValidacion } from "@src/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@src/contexts/CartContext";
import { useContext } from "react";
import { login } from "@src/api/auth";
import {
  emailField,
  passwordField,
  emailValidation,
  passwordValidation,
} from "@src/utils/formSchemas";

export default function LoginForm() {
  const navigate = useNavigate();
  const { validar } = useValidacion();
  const { obtenerCarrito } = useContext(CartContext);
  const fields = [emailField, passwordField];

  const validationSchema = yup.object().shape({
    email: emailValidation,
    password: passwordValidation,
  });

  const handleFormSubmit = async (loginRequest) => {
    try {
      const response = await login(loginRequest);
      const userId = await validar(response);
      await obtenerCarrito(userId);
      navigate("/");
    } catch (error) {
      console.error("Error de login", error);
    }
  };

  return (
    <Form
      fields={fields}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
      title="Ingresá"
      buttonText="Enviar"
      validationMode="onChange"
    />
  );
}

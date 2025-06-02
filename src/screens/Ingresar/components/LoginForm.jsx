import * as yup from "yup";
import Form from "@src/components/forms/Form";
import { useValidacion } from "@src/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  emailField,
  passwordField,
  emailValidation,
  passwordValidation,
} from "@src/utils/formSchemas";

export default function LoginForm() {
  const { validar } = useValidacion();
  const navigate = useNavigate();
  const fields = [emailField, passwordField];

  const validationSchema = yup.object().shape({
    email: emailValidation,
    password: passwordValidation,
  });

  const handleFormSubmit = async (data) => {
    await validar(data);
    navigate("/");
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

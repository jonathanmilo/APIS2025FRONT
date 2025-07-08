import * as yup from "yup";
import Form from "@src/components/forms/Form";
import { useContext } from "react";
import { register } from "@src/api/auth";
import { CartContext } from "@src/contexts/CartContext";
import { buildUser } from "@src/builders";
import {
  nameField,
  lastnameField,
  emailField,
  passwordField,
  nameValidation,
  lastnameValidation,
  emailValidation,
  passwordValidation,
} from "@src/utils/formSchemas";

export default function RegisterForm({ setFormMode }) {
  const { cart } = useContext(CartContext);

  const fields = [nameField, lastnameField, emailField, passwordField];

  const validationSchema = yup.object().shape({
    name: nameValidation,
    lastname: lastnameValidation,
    email: emailValidation,
    password: passwordValidation,
  });

  const handleFormSubmit = async (data) => {
    const newUser = buildUser(data, cart);
    const success = await register(newUser);

    if (success) {
      setFormMode("login");
    }
  };

  return (
    <Form
      fields={fields}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
      title="Registrate"
      buttonText="Enviar"
      validationMode="onChange"
    />
  );
}

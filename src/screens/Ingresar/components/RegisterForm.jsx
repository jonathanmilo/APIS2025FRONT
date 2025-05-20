import * as yup from "yup";
import Form from "@src/components/Form";
import { useContext } from "react";
import { useValidacion } from "@src/contexts/AuthContext";
import { CartContext } from "@src/contexts/CartContext";
import { crearCarrito } from "@src/api/cart/cartService";
import { capitalize } from "@mui/material";
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
  const { register } = useValidacion();

  const fields = [nameField, lastnameField, emailField, passwordField];

  const validationSchema = yup.object().shape({
    name: nameValidation,
    lastname: lastnameValidation,
    email: emailValidation,
    password: passwordValidation,
  });

  const buildUser = (data) => ({
    id: Date.now().toString(),
    username: `${data.name.toLowerCase().trim()}${data.lastname.toLowerCase().trim()}`,
    email: data.email.trim(),
    password: data.password.trim(),
    firstName: capitalize(data.name.trim()),
    lastName: capitalize(data.lastname.trim()),
    address: {
      street: "",
      state: "",
      country: "",
    },
    avatar: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const handleFormSubmit = async (data) => {
    const newUser = buildUser(data);
    const success = await register(newUser);

    if (success) {
      await crearCarrito(newUser.id, cart);
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

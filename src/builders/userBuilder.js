import { capitalize } from "@mui/material";

export function buildUser(data, products) {
  return {
    email: data.email.trim(),
    password: data.password.trim(),
    firstName: capitalize(data.name.trim()),
    lastName: capitalize(data.lastname.trim()),
    products: products
  };
}

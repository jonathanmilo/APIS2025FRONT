import { capitalize } from "@mui/material";

export function buildUser(data) {
  return {
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
  };
}

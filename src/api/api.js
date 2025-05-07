import { API_URL } from "../global/store";

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};

export const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
};

export const fetchUserCart = async (id) => {
  const res = await fetch(`${API_URL}/carts/${id}`);
  return res.json();
};

export const fetchCarts = async () => {
  const res = await fetch(`${API_URL}/carts`);
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categories`);
  return res.json();
};

export const fetchOrders = async () => {
  const res = await fetch(`${API_URL}/orders`);
  return res.json();
};

export const getUserById = async (id) => {
  const users = await fetchUsers();
  return users.find((user) => user.id === id);
};

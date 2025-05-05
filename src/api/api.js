import { API_URL } from "../global/store";

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};

export const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
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
  return users.find((user) => user._id === id);
};

export const updateCart = async (userId, products) => {
  try {
    // Primero intenta encontrar el carrito existente
    const carts = await fetchCarts();
    const cartExists = carts.some(c => c.userId === userId);

    const url = `${API_URL}/${cartExists ? 'carts' : 'carts/create'}`;
    const method = cartExists ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, products })
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error updating cart:", error);
    // Fallback a localStorage
    localStorage.setItem(`cart_${userId}`, JSON.stringify(products));
    return { userId, products };
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
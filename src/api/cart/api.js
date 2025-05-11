import api from "../index";

export const fetchUserCart = (userId) => api.get(`/carts/${userId}`);
export const saveUserCart = (userId, products) => api.put(`/carts/${userId}`, { products });

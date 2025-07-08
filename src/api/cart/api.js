import {api} from "../index";

export const createCart = (cartData) => api.post(`/carts`, cartData);

export const fetchUserCart = (userId) => api.get(`/carts/user/${userId}`);

export const saveUserCart = (userId, products) => api.put(`/carts/${userId}`, { products }); 

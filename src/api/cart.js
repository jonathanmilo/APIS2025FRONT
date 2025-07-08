import {api} from "./index";

export const fetchUserCart = (userId) => api.get(`/carts/user/${userId}`);
export const syncCarts = (userId, products) => api.patch(`/carts/${userId}/products`, products ); 
export const saveUserCart = (userId, products) => api.put(`/carts/${userId}/products`, products ); 

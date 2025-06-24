import api from "../index";

export const createCart = (cartData) => api.post(`/carts`, cartData);

export const fetchUserCart = (userId) => api.get(`/carts/user/${userId}`);

// --- FUNCIONES QUE USAN ENDPOINTS QUE NO ESTAN EN EL BACK ---
// export const saveUserCart = (userId, products) => api.put(`/carts/${userId}`, { products });
// export const addProductInCart = (userId, productData) => api.post(`/carts/${userId}/products`, productData);

export const updateProductQuantityInCart = (userId, products) => {
  // PATCH para actualizar productos en el carrito
  return api.patch(`/carts/${userId}/products`, products);
};
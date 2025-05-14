import api from "../index";

export const createCart = (cartData) => api.post(`/carts`, cartData);

export const fetchUserCart = (userId) => api.get(`/carts/${userId}`);

export const saveUserCart = (userId, products) => api.put(`/carts/${userId}`, { products }); 

export const updateProductQuantityInCart = (userId, productId, quantity) => { // TODO: implementar cuando esté endpoint en backend
  return api.patch(`/carts/${userId}/products`, { productId, quantity });
};

export const addProductInCart = (userId, productData) => { // TODO: implementar cuando esté endpoint en backend
  return api.post(`/carts/${userId}/products`, productData);
};

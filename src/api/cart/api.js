import api from "../index";

export const createCart = (userId) => api.post(`/carts/${userId}`, { products }); // TODO: ejecutar despues del register -> products vacio o con datos de local storage (si hay)

export const fetchUserCart = (userId) => api.get(`/carts/${userId}`);

export const saveUserCart = (userId, products) => api.put(`/carts/${userId}`, { products }); 

export const updateProductQuantityInCart = (userId, productId, quantity) => { // TODO: implementar cuando esté endpoint en backend
  return api.patch(`/carts/${userId}/products`, { productId, quantity });
};

export const addProductInCart = (userId, productData) => { // TODO: implementar cuando esté endpoint en backend
  return api.post(`/carts/${userId}/products`, productData);
};

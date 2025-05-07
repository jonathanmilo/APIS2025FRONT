import api from "./index";

export const fetchAllProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
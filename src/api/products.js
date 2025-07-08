import {api} from "./index";

export const fetchAllProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const fetchProductsByUserId = (userId) => api.get(`/products/user/${userId}`);
export const fetchProductsByCategoryId = (categoryId) => api.get(`/products/category/${categoryId}`);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data); 
export const updateProductStock = (id, newStock) => api.patch(`/products/${id}/stock`, { stock: newStock });
export const createProduct = (productData) => api.post('/products', productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const fetchUserProducts = (userId) => api.get(`/products?userId=${userId}`);

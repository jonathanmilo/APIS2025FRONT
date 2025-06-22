import {api,our_api} from "./index";

export const fetchAllProducts = () => our_api.get('/products');
export const fetchProductById = (id) => our_api.get(`/products/${id}`);
export const fetchProductsByUserId = (userId) => our_api.get(`/products/user/${userId}`);
export const fetchProductsByCategoryId = (categoryId) => our_api.get(`/products/category/${categoryId}`);
export const updateProduct = (id, data) => our_api.put(`/products/${id}`, data); 
export const updateProductStock = (id, newStock) => our_api.patch(`/products/${id}/stock`, { stock: newStock });
export const createProduct = (productData) => our_api.post('/products', productData);
export const deleteProduct = (id) => our_api.delete(`/products/${id}`);
export const fetchUserProducts = (userId) => our_api.get(`/products?userId=${userId}`);

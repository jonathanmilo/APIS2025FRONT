import api from "./index";

export const fetchAllProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data); 
export const updateProductStock = (id, newStock) =>    api.patch(`/products/${id}`, { stock: newStock });
export const createProduct = (productData) => api.post('/products', productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

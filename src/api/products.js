import api from "./index";

export const fetchAllProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data); // para acutalizar el stock despues del checkout
export const updateProductStock = (id, newStock) =>    api.patch(`/products/${id}`, { stock: newStock });

// falta delete en caso de que un usuario quiera borrar su publicacion
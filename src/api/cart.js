import api from './index';

export const fetchUserCart = (userId) => api.get(`/carts/${userId}`);
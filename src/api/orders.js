import { api } from './index';

export const fetchAllOrders = () => api.get('/orders');

export const fetchOrdersByUserId = (userId) => api.get(`orders/user/${userId}`);
import { api, our_api } from './index';

export const fetchAllOrders = () => api.get('/orders');

export const fetchOrdersByUserId = (userId) => our_api.get(`orders/user/${userId}`);
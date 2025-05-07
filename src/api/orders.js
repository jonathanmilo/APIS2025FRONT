import api from './index';

export const fetchAllOrders = () => api.get('/orders');
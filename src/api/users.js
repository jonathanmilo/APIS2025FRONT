import api from './index';

export const fetchAllUsers = () => api.get('/users');
export const fetchUserById = (id) => api.get(`/users/${id}`);
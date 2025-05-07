import api from './index';

export const fetchAllCategories = () => api.get('/categories');
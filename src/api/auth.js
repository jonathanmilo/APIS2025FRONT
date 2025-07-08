import {api} from './index';

export const register = (registerRequest) => api.post('/auth/register', registerRequest); 
export const login = (loginRequest) => api.post('/auth/login', loginRequest); 
export const logout = () => api.post('/auth/logout'); 
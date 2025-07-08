import {api} from './index';

export const fetchAllUsers = () => api.get('/users');
export const fetchUserById = (id) => api.get(`/users/${id}`);
export const createUser = (userData) => api.post('/users', userData); 
export const updateUsername = (id, newUsername) => api.patch(`/users/${id}/username`, { username: newUsername });
export const updateFirstName = (id, newFirstName) => api.patch(`/users/${id}/firstName`, { firstName: newFirstName });
export const updateLastName = (id, newLastName) => api.patch(`/users/${id}/lastName`, { lastName: newLastName });
export const updateAddress = (id, newAddress) => api.patch(`/users/${id}/address`, { country: newAddress.country, state: newAddress.state, street: newAddress.street });
export const updateAvatar = (id, newAvatar) => api.patch(`/users/${id}/avatar`, { avatar: newAvatar });
export const updateEmail = (id, newEmail) => api.patch(`/users/${id}/email`, { email: newEmail });
export const updatePassword = (id, newPassword) => api.patch(`/users/${id}/password`, { password: newPassword });

export const getProfile = () => api.get('/users/me'); 
import {api, our_api} from './index';

export const fetchAllUsers = () => our_api.get('/users');
export const fetchUserById = (id) => our_api.get(`/users/${id}`);
export const createUser = (userData) => our_api.post('/users', userData); 
export const updateUsername = (id, newUsername) => our_api.patch(`/users/${id}/username`, { username: newUsername });
export const updateFirstName = (id, newFirstName) => our_api.patch(`/users/${id}/firstName`, { firstName: newFirstName });
export const updateLastName = (id, newLastName) => our_api.patch(`/users/${id}/lastName`, { lastName: newLastName });
export const updateAddress = (id, newAddress) => our_api.patch(`/users/${id}/address`, { address: newAddress });
export const updateAvatar = (id, newAvatar) => our_api.patch(`/users/${id}/avatar`, { avatar: newAvatar });
export const updateEmail = (id, newEmail) => our_api.patch(`/users/${id}/email`, { email: newEmail });
export const updatePassword = (id, newPassword) => our_api.patch(`/users/${id}/password`, { password: newPassword });
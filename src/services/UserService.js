import { getUserById, fetchUsers } from "../api/api.js";

export const getUserData = async (id) => {
  try {
    const user = await getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

export const getAllUsersData = async () => {
  try {
    const users = await fetchUsers();

    return users;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

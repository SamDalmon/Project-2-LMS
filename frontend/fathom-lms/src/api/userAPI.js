import apiClient, { logResponse } from "./apiClient";  

const prefix = '/users';

export const usersApi = {
  getAllUsers: async () => {
    const response = await apiClient.get(prefix);
    logResponse(response);

    return response.data;
  },

  approveUser: async (userId) => {
    const response = await apiClient.post(
      `${prefix}/${userId}/approve`
    );
    logResponse(response);

    return response.data;
  },

  rejectUser: async (userId) => {
    const response = await apiClient.post(
      `${prefix}/${userId}/reject`
    );
    logResponse(response);

    return response.data;
  },
}


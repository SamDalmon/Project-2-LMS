import apiClient, { logResponse } from "./apiClient";  

const prefix = '/api/users/';

export const usersApi = {
  getAllUsers: async () => {
    const response = await apiClient.get(prefix);
    logResponse(response);

    return response.data;
  },

  approveUser: async (user) => {
    const response = await apiClient.post(
      `${prefix}${user.pk}/approve/`
    );
    logResponse(response);

    return response.data;
  },

  rejectUser: async (user) => {
    const response = await apiClient.post(
      `${prefix}${user.pk}/reject/`
    );
    logResponse(response);

    return response.data;
  },
}


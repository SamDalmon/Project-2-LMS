import apiClient, { logResponse } from "./apiClient";

const prefix = '/api/users/auth';

export const authApi = {
  signIn: async (username, password) => {
    const data = { username, password };
    const response = await apiClient.post(`${prefix}/login`, data);
    logResponse(response);
    
    return response.data;
  },

  signOut: async () => {
    const response = await apiClient.post(`${prefix}/logout`);
    logResponse(response);

    return response.data;
  },

  studentSignUp: async (
    username, password, email, firstName, lastName
  ) => {
    const data = { username, password, email, firstName, lastName };
    const response = await apiClient.post(`${prefix}/registration/student`, data);
    logResponse(response);

    return response.data;
  },

  teacherSignUp: async (
    username, password, email, firstName, lastName
  ) => {
    const data = { username, password, email, firstName, lastName };
    const response = await apiClient.post(`${prefix}/registration/student`, data);
    logResponse(response);

    return response.data;
  },
}
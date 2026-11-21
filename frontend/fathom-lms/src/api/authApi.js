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

  studentSignUp: async (signUpFields) => {
    const data = {...signUpFields, password1: signUpFields.password, password2: signUpFields.password};
    const response = await apiClient.post(`${prefix}/registration/student`, data);
    logResponse(response);

    return response.data;
  },

  teacherSignUp: async (signUpFields) => {
    const data = {...signUpFields, password1: signUpFields.password, password2: signUpFields.password};    
    const response = await apiClient.post(`${prefix}/registration/teacher`, data);
    logResponse(response);

    return response.data;
  },

  getCurrentUser: async (signal) => { 
    const response = await apiClient.get(`${prefix}/user`, { signal });
    logResponse(response);

    return response.data;
  }
}
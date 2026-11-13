import apiClient, { logResponse } from "./apiClient";

const prefix = '/api/courses'

export const coursesApi = {
  getAllCourses: async (signal) => {
    const response = await apiClient.get(prefix, { signal });
    logResponse(response);

    return response;
  },

  addCourse: async (newCourse) => {
    const response = await apiClient.post(prefix, newCourse);
    logResponse(response);
    
    return response.data;
  },

  editCourse: async (newCourse) => {
    const response = await apiClient.put(
      `${prefix}/${newCourse.id}`,
      newCourse
    );
    logResponse(response);

    return response.data;
  },

  enrollInCourse: async (courseId) => {
    const response = await apiClient.post(`${prefix}/${courseId}/enroll`);
    logResponse(response);

    return response.data;
  },

  unEnrollInCourse: async (courseId) => {
    const response = await apiClient.delete(`${prefix}/${courseId}/unenroll`);
    logResponse(response);

    return response.data;
  }
}
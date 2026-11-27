import axios from 'axios'

const isLogging = false;

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
export default apiClient;

let onLogoutCallback = () => {
  window.location.href = '/sign-in';
}

export const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/',
  withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    };
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url.includes('/auth/login') ||
      originalRequest.url.includes('/auth/token/refresh')
    ) {
      return Promise.reject(error);
    }

    if(error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => apiClient(originalRequest))
          .catch((error) => Promise.reject(error));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshClient.post('/api/users/auth/token/refresh');

        processQueue(null);

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        if (!originalRequest.url.includes('/auth/user')) {
          onLogoutCallback();
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
)


export function logResponse(response){
  if (isLogging){
    console.log('Status: ', response.status);
    console.log('Data: ', JSON.stringify(response.data));
  }
}

export function isRequestCanceled(error) {
  return axios.isCancel(error)
}

export function isClientError(error) {
  return axios.isAxiosError(error)
}
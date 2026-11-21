import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient;

export function logResponse(response){
  console.log('Status: ', response.status);
  console.log('Data: ', response.data);
}

export function isRequestCanceled(error) {
  return axios.isCancel(error)
}
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (payload) => api.post('/auth/login', payload);
export const register = (payload) => api.post('/auth/register', payload);
export const getCourses = (query = '') => api.get(`/courses${query}`);
export const createCourse = (payload) => api.post('/courses', payload);
export const updateCourse = (courseId, payload) => api.put(`/courses/${courseId}`, payload);
export const deleteCourse = (courseId) => api.delete(`/courses/${courseId}`);
export const enrollCourse = (courseId) => api.post(`/enrollments/${courseId}`);

export default api;

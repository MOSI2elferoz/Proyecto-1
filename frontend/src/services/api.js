import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);

export const getTasks = () => api.get('/tasks');
export const createTask = (data) => api.post('/tasks', data);

export const getUsers = () => api.get('/users');

export default api;

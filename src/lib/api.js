import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

// API helper functions
export async function fetchFeaturedProjects() {
  const res = await apiClient.get('/projects/featured');
  return res.data;
}

export async function fetchAllProjects() {
  const res = await apiClient.get('/projects');
  return res.data;
}

export async function fetchProjectBySlug(slug) {
  const res = await apiClient.get(`/projects/${slug}`);
  return res.data;
}

export async function fetchTechnologies() {
  const res = await apiClient.get('/technologies');
  return res.data;
}

export async function fetchAbout() {
  const res = await apiClient.get('/about');
  return res.data;
}

export async function submitContact(data) {
  const res = await apiClient.post('/contact', data);
  return res.data;
}

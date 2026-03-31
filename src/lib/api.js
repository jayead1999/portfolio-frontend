import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
// export async function fetchFeaturedProjects() {
//   const res = await apiClient.get('/projects');
//   return res;
// }

export async function fetchAllProjects() {
  const res = await apiClient.get('/projects');
  return res;
}

export async function fetchProjectBySlug(slug) {
  const res = await apiClient.get(`/projects/${slug}`);
  return res;
}

export async function fetchPricings() {
  const res = await apiClient.get('/pricings');
  return res;
}

export async function fetchTechnologies() {
  const res = await apiClient.get('/technologies');
  return res;
}

export async function fetchHero() {
  const res = await apiClient.get('/heroes');
  return res;
}

// Title 
export async function  fetchTitles(){
  const res  = await apiClient.get('/titles');
  return res;

}

export async function fetchAbout() {
  const res = await apiClient.get('/about');
  return res;
}

export async function submitContact(data) {
  const res = await apiClient.post('/contact', data);
  return res.data;
} 

export async function fetchTestimonials() {
  const res = await apiClient.get('/testimonials');
  return res;
}

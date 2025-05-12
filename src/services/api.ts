import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
  },
  users: {
    profile: '/users/profile',
    switchRole: '/users/switch-role',
    switchProfile: '/users/switch-profile',
  },
  medicalRecords: {
    list: '/medical-records',
    details: (id: string) => `/medical-records/${id}`,
    create: '/medical-records',
    update: (id: string) => `/medical-records/${id}`,
  },
  appointments: {
    list: '/appointments',
    create: '/appointments',
    cancel: (id: string) => `/appointments/${id}/cancel`,
    reschedule: (id: string) => `/appointments/${id}/reschedule`,
  },
  medicalServices: {
    create: '/medical-services',
    triage: '/medical-services/triage',
    exam: '/medical-services/exam',
    diagnosis: '/medical-services/diagnosis',
    hospitalization: '/medical-services/hospitalization',
    treatment: '/medical-services/treatment',
  },
  accessManagement: {
    requests: '/access/requests',
    approve: (id: string) => `/access/requests/${id}/approve`,
    reject: (id: string) => `/access/requests/${id}/reject`,
    users: '/access/users',
  },
};

export default api;
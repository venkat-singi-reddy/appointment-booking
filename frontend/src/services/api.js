import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Doctor APIs
export const doctorAPI = {
  getAll: () => api.get('/doctors'),
  getAvailable: () => api.get('/doctors/available'),
  getById: (id) => api.get(`/doctors/${id}`),
  getBySpecialization: (spec) => api.get(`/doctors/specialization/${spec}`),
  search: (name) => api.get('/doctors/search', { params: { name } }),
};

// Patient APIs
export const patientAPI = {
  getAll: () => api.get('/patients'),
  getById: (id) => api.get(`/patients/${id}`),
  getByEmail: (email) => api.get(`/patients/email/${email}`),
  createOrFind: (data) => api.post('/patients', data),
  update: (id, data) => api.put(`/patients/${id}`, data),
};

// Appointment APIs
export const appointmentAPI = {
  getAll: () => api.get('/appointments'),
  getById: (id) => api.get(`/appointments/${id}`),
  book: (data) => api.post('/appointments', data),
  getByPatientId: (patientId) => api.get(`/appointments/patient/${patientId}`),
  getByPatientEmail: (email) => api.get(`/appointments/patient/email/${email}`),
  getByDoctorId: (doctorId) => api.get(`/appointments/doctor/${doctorId}`),
  cancel: (id) => api.delete(`/appointments/${id}/cancel`),
  updateStatus: (id, status) =>
    api.put(`/appointments/${id}/status`, null, { params: { status } }),
};

export default api;

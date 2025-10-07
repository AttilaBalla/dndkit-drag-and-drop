// src/services/apiService.ts
import axios, { AxiosError, AxiosResponse } from 'axios';

const BASE_URL = 'localhost:3333'; // Example API

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


function handleResponse<T>(response: AxiosResponse<T>): T {
  return response.data;
}

function handleError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`API Error: ${message}`);
  }
  throw new Error('An unexpected error occurred.');
}

const apiService = {
  get: async <T>(endpoint: string): Promise<T> => {
    try {
      const res = await api.get<T>(endpoint);
      return handleResponse(res);
    } catch (error) {
      handleError(error);
    }
  },

  post: async <T, U = unknown>(endpoint: string, data: U): Promise<T> => {
    try {
      const res = await api.post<T>(endpoint, data);
      return handleResponse(res);
    } catch (error) {
      handleError(error);
    }
  },

  put: async <T, U = unknown>(endpoint: string, data: U): Promise<T> => {
    try {
      const res = await api.put<T>(endpoint, data);
      return handleResponse(res);
    } catch (error) {
      handleError(error);
    }
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    try {
      const res = await api.delete<T>(endpoint);
      return handleResponse(res);
    } catch (error) {
      handleError(error);
    }
  },
};

export default apiService;

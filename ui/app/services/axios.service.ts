import axios from 'axios';
import { useEffect } from 'react';

const axiosInstance = axios.create({
  baseURL: process.env.BASE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useAxios = () => {
  return { axios: axiosInstance };
};

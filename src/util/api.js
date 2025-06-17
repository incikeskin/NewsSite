'use client';
import axios from 'axios';
import { hostUrl } from './constants';
import { clearStorage } from './util-functions.ts';

const API_KEY = '5j7CsYlVppA4UIPYpCfzIU:2SNNk8iRyEl6NB7DBJuSf8';

const axiosClient = axios.create({
  baseURL: hostUrl,
  headers: { 'Content-Type': 'application/json', authorization: `apikey ${API_KEY}` },
});

axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return error?.response;
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      clearStorage();
      window.location.href = '/auth/login';
    }
    return error?.response;
  }
);

export default axiosClient;

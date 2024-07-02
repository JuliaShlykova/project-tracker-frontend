import axios from 'axios';
import { getToken, setToken, removeToken, clearStorage } from '../services/localStorage';
import removeTokenCookie from '../utils/removeCookies';

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const instanceWithoutAccessToken = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    return Promise.reject(new Error('no token'));
  }
  return config;
  }, (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use((response) => {
    return response;
  }, async (err) => {
    const originalConfig = err.config;
    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      removeToken();
      try {
        const rs = await instanceWithoutAccessToken.post('/auth/refresh', {});
        setToken(rs.data.token);
        return instance(originalConfig);
      } catch(_error) {
        removeTokenCookie();
        clearStorage();
        return Promise.reject(_error);
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
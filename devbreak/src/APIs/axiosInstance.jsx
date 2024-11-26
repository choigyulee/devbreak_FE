import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 1000000,
});

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = sessionStorage.getItem('accessToken'); // 세션 스토리지에서 액세스 토큰 가져오기
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshTokenAndLogin } = useAuth(); 
        const accessToken = await refreshTokenAndLogin();
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        // const refreshToken = sessionStorage.getItem('refreshToken'); // 세션 스토리지에서 리프레시 토큰 가져오기
        // if (!refreshToken) {
        //   throw new Error('No refresh token available');
        // }

        // // 리프레시 토큰을 사용하여 액세스 토큰 갱신
        // const response = await axiosInstance.post('/api/auth/refresh', { refreshToken });

        // const { accessToken } = response.data;
        // sessionStorage.setItem('accessToken', accessToken); // 갱신된 액세스 토큰을 세션 스토리지에 저장

        // originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 오류 발생 시 로그인 페이지로 리디렉션
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

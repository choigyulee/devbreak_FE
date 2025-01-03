import axios from 'axios';
import postAuthRefresh from './post/postAuthRefresh';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 100000,
});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('Received 401 Unauthorized error, attempting to refresh token');
      originalRequest._retry = true;

      try {
        // 리프레시 토큰을 이용해 액세스 토큰 갱신
        const accessToken = await postAuthRefresh(); 
        console.log('Successfully refreshed access token');
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest); // 요청 재시도
      } catch (refreshError) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/login'; // 로그인 페이지로 리디렉션
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


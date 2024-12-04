import axios from 'axios';
import postAuthRefresh from './post/postAuthRefresh';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 100000,
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
      console.log('Received 401 Unauthorized error, attempting to refresh token');
      originalRequest._retry = true;

      try {
        // 리프레시 토큰을 이용해 액세스 토큰 갱신
        const accessToken = await postAuthRefresh(); 
        console.log('Successfully refreshed access token');
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest); // 요청 재시도
      } catch (refreshError) {
        console.error('Failed to refresh access token:', refreshError);
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        window.location.href = '/login'; // 로그인 페이지로 리디렉션
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


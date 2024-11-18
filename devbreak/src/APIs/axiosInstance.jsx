import axios from 'axios';
import Cookies from 'js-cookie';


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 10000,
  });
  
  axiosInstance.interceptors.request.use(
    config => {
      const accessToken = Cookies.get('accessToken');
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
          const refreshToken = Cookies.get('refreshToken');
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }
  
          // 리프레시 토큰을 사용하여 액세스 토큰 갱신
          const response = await axiosInstance.post('/api/auth/refresh', { refreshToken });
  
          const { accessToken } = response.data;
          Cookies.set('accessToken', accessToken, { expires: 1 });
  
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // 오류 발생 시 로그인 페이지로 리디렉션
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  
  export default axiosInstance;
  
import axios from 'axios';
import Cookies from 'js-cookie';

// axiosInstance에서 타임아웃을 줄여서, 응답이 너무 길어지는 경우 처리
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 10000, // 10초로 타임아웃을 설정 (기존 100000 -> 10000)
  });
  
  // 요청 인터셉터에서 액세스 토큰을 헤더에 추가
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
  
  // 응답 인터셉터에서 401 오류 처리
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
  
          // 토큰 갱신 요청
          const response = await axiosInstance.post('/api/auth/refresh', {
            refreshToken
          });
  
          const { accessToken } = response.data;
          Cookies.set('accessToken', accessToken, { expires: 1 });
  
          // 요청 헤더에 새 액세스 토큰을 추가
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // 오류 발생 시 토큰 삭제하고 로그인 페이지로 리디렉션
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
  
      // 기타 오류 처리
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;
  
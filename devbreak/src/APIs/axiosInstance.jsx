import axios from 'axios';
import postAuthRefresh from './post/postAuthRefresh';
import postAuthLogout from './post/postAuthLogout';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 100000,
});

// 세션 상태 관리
let isSessionExpired = false;

// 세션 만료 처리 함수
const handleSessionExpiration = async () => {
  if (!isSessionExpired) {
    isSessionExpired = true;
    try {
      await postAuthLogout();
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error);
    } finally {
      alert('세션이 만료되었습니다. 다시 로그인하세요.');
      window.location.href = '/login';
    }
  }
};

axiosInstance.interceptors.request.use(  
  async (config) => {
    config.withCredentials = true; 
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 리프레시 토큰 갱신 요청 자체는 재시도하지 않음
    if (originalRequest.url?.includes('auth/refresh')) {
      return Promise.reject(error);
    }

    // 401 에러 && 첫 시도인 경우에만 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log('액세스 토큰 갱신 시도 중...');
        await postAuthRefresh();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError.response?.data || refreshError.message);
        await handleSessionExpiration();
        return Promise.reject(refreshError);
      }
    }

    // 그 외 에러는 그대로 반환
    return Promise.reject(error);
  }
);

export default axiosInstance;
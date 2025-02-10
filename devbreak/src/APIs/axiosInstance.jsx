import axios from 'axios';
import postAuthRefresh from './post/postAuthRefresh';
import postAuthLogout from './post/postAuthLogout';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 100000,
});

let hasShownSessionExpiredAlert = false;

// 세션 만료 처리 함수
const handleSessionExpired = async () => {
  if (!hasShownSessionExpiredAlert) {
    hasShownSessionExpiredAlert = true;
    await postAuthLogout();
    alert('세션이 만료되었습니다. 다시 로그인하세요.');
    window.location.href = '/login';
  }
};

// Request 인터셉터
axiosInstance.interceptors.request.use(
  async (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 && 재시도하지 않은 요청인 경우에만 처리
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('auth/refresh')
    ) {
      try {
        originalRequest._retry = true;
        await postAuthRefresh();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error(
          '리프레시 토큰 갱신 오류:',
          refreshError.response?.data || refreshError.message
        );
        await handleSessionExpired();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
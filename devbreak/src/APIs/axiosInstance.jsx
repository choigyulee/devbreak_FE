import axios from 'axios';
import postAuthRefresh from './post/postAuthRefresh';
import postAuthLogout from './post/postAuthLogout';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 100000,
});

// 토큰 갱신 관련 상태 관리
let isRefreshing = false;
let failedQueue = [];
let hasShownSessionExpiredAlert = false; // 세션 만료 알림 상태 추적

// 실패한 요청 큐 처리 함수
const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// 로그아웃 및 리다이렉트 처리 함수
const handleLogoutAndRedirect = async () => {
  if (!hasShownSessionExpiredAlert) {
    hasShownSessionExpiredAlert = true;
    await postAuthLogout();
    alert('세션이 만료되었습니다. 다시 로그인하세요.');
    window.location.href = '/login'; // 명시적으로 로그인 페이지로 이동
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
      !originalRequest.url?.includes('auth/refresh') // 리프레시 요청 자체는 재시도하지 않음
    ) {
      if (isRefreshing) {
        try {
          // 진행 중인 리프레시 완료 대기
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => axiosInstance(originalRequest));
        } catch (err) {
          return Promise.reject(err);
        }
      }

      try {
        originalRequest._retry = true;
        isRefreshing = true;

        console.log('액세스 토큰 갱신 시도 중...');
        await postAuthRefresh();
        
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error(
          '리프레시 토큰 갱신 오류:',
          refreshError.response?.data || refreshError.message
        );
        processQueue(refreshError);
        await handleLogoutAndRedirect();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 401 이외의 에러는 바로 리젝트
    return Promise.reject(error);
  }
);

export default axiosInstance;
import axios from 'axios';
import postAuthRefresh from './post/postAuthRefresh';
import postAuthLogout from './post/postAuthLogout';
import getAuthStatus from './get/getAuthStatus';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 100000,
});


const handleSessionExpired = async () => {
  try {
    const authStatus = await getAuthStatus();
    
    // 로그인되지 않은 상태에서는 세션 만료 처리 로직을 실행하지 않음
    if (!authStatus.loggedIn) {
      return;
    }

    // 로그인된 상태에서 세션 만료 처리
    if (!hasShownSessionExpiredAlert) {
      hasShownSessionExpiredAlert = true;
      await postAuthLogout();
      alert('세션이 만료되었습니다. 다시 로그인하세요.');
      window.location.href = '/login';
    }
  } catch (error) {
    console.error('로그인 상태 확인 중 에러:', error);
    // 에러 발생 시 세션 만료 처리도 실행
    await handleSessionExpired();
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
        // 로그인 상태 확인
        const authStatus = await getAuthStatus();

        // 로그인되지 않은 상태에서는 세션 만료 처리를 실행하지 않음
        if (!authStatus.loggedIn) {
          return Promise.reject(error);
        }

        originalRequest._retry = true;
        await postAuthRefresh();  // 리프레시 토큰 갱신 시도
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
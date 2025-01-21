import axios from 'axios';
import postAuthRefresh from './post/postAuthRefresh';
import postAuthLogout from './post/postAuthLogout';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 100000,
});

let isRefreshing = false; // 리프레시 요청 상태
let failedQueue = []; // 대기 중인 요청 큐

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

    // 401 Unauthorized 상태 처리
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 리프레시 요청 대기 중이면, Promise로 요청 큐에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('액세스 토큰 갱신 시도 중...');
        await postAuthRefresh();
        processQueue(null); // 대기 중인 요청 처리
        return axiosInstance(originalRequest); // 원래 요청 재시도
      } catch (refreshError) {
        console.error('리프레시 토큰 갱신 오류:', refreshError.response?.data || refreshError.message);
        processQueue(refreshError); // 대기 중인 요청에 에러 전달

        await postAuthLogout();
        alert('세션이 만료되었습니다. 다시 로그인하세요.');
        window.location.reload();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false; // 리프레시 상태 해제
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


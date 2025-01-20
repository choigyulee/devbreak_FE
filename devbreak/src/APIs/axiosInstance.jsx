import axios from 'axios';
import postAuthRefresh from './post/postAuthRefresh';
import postAuthLogout from './post/postAuthLogout';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 100000,
});

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

    const logout = async () => {
      try {
        await postAuthLogout();
        console.log('로그아웃 완료');
        window.location.reload(); // 세션 만료 후 새로고침
      } catch (logoutError) {
        console.error('로그아웃 요청 실패:', logoutError.response?.data || logoutError.message);
      }
    };

    // 401 Unauthorized 상태 처리
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log('액세스 토큰 갱신 시도 중...'); 
        await postAuthRefresh();

          // 갱신된 토큰으로 다시 요청
          return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('리프레시 토큰 갱신 오류:', refreshError.response?.data || refreshError.message);
        await postAuthLogout();
        alert('세션이 만료되었습니다. 다시 로그인하세요.');
        window.location.reload();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
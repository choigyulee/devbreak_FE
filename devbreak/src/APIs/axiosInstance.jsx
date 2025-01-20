import axios from 'axios';
import postAuthRefresh from './post/postAuthRefresh';
import { Cookies } from "react-cookie";
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

      console.log('액세스 토큰 갱신 시도 중...'); 

      try {
        // 리프레시 토큰 갱신 함수 호출
        const newAccessToken = await postAuthRefresh();
        
        if (newAccessToken) {
          console.log('새로운 액세스 토큰 획득:', newAccessToken);  // 새로운 액세스 토큰 로그

          // 원래 요청에 새로운 액세스 토큰을 추가
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // 갱신된 토큰으로 다시 요청
          return axiosInstance(originalRequest);
        } else {
          console.error('액세스 토큰 갱신 실패.');
        }
      } catch (refreshError) {
        console.error('리프레시 토큰 갱신 오류:', refreshError.response?.data || refreshError.message);
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
        logout();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
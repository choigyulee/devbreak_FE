import axios from 'axios';
import postAuthRefresh from './post/postAuthRefresh';
import { Cookies } from "react-cookie";
import { useAuth } from '../context/AuthContext';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 100000,
});

axiosInstance.interceptors.request.use(  
  async (config) => {
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
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

    const logout = () => {
      const cookies = new Cookies();
      cookies.remove('isLoggedIn');
      window.location.reload(); 
    };


    // 401 Unauthorized 상태일 때 리프레시 토큰을 이용한 갱신 로직
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
        console.error('리프레시 토큰 갱신 오류:', refreshError); // 갱신 실패 로그
        alert('토큰 만료')
        logout();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


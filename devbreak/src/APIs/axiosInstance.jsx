import axios from 'axios';
import postAuthRefresh from './post/postAuthRefresh';
import { Cookies } from "react-cookie";

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

    // 401 Unauthorized 상태일 때 리프레시 토큰을 이용한 갱신 로직
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await postAuthRefresh(); // 리프레시 토큰 갱신 함수 호출

        // 원래 요청에 새로운 액세스 토큰을 추가
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        // 갱신된 토큰으로 다시 요청
        return axiosInstance(originalRequest); 
      } catch (refreshError) {
        console.log('Refresh token error:', refreshError);
        window.location.href = '/login'; // 리프레시 토큰 갱신 실패 시 로그인 화면으로 리다이렉트
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


import axios from 'axios';
import postAuthRefresh from './post/postAuthRefresh';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 100000,
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('Received 401 Unauthorized error, attempting to refresh token');
      originalRequest._retry = true;

      try {
        // 리프레시 토큰을 통해 액세스 토큰을 갱신
        const accessToken = await postAuthRefresh(); 
        console.log('Successfully refreshed access token:', accessToken);
        
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest); // 재시도 요청
      } catch (refreshError) {
        console.error('Failed to refresh access token:', refreshError);
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        window.location.href = '/login'; // 로그인 페이지로 리디렉션
        return Promise.reject(refreshError);
      }
    }

    console.error('Response error:', error);
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  response => {
    console.log('Response received:', response); // 응답 로그
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // 401 Unauthorized 에러가 발생한 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('Received 401 error, attempting to refresh token');
      originalRequest._retry = true;

      try {
        // 리프레시 토큰을 이용해 액세스 토큰 갱신
        const accessToken = await postAuthRefresh();
        console.log('Successfully refreshed access token:', accessToken);

        // 요청 헤더에 갱신된 액세스 토큰을 추가
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        // 요청을 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh access token:', refreshError);
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        window.location.href = '/login'; // 로그인 페이지로 리디렉션
        return Promise.reject(refreshError);
      }
    }

    console.error('Response error:', error);
    return Promise.reject(error);
  }
);


export default axiosInstance;

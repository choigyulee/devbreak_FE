import axios from 'axios';
// import postAuthRefresh from './post/postAuthRefresh';
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 100000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    // const accessToken = sessionStorage.getItem('accessToken'); // 세션 스토리지에서 액세스 토큰 가져오기
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('Received 401 Unauthorized error, attempting to refresh token');
      originalRequest._retry = true;

      try {
        // 리프레시 토큰을 이용해 액세스 토큰 갱신
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

         // 리프레시 토큰을 서버로 보내어 새로운 액세스 토큰을 요청
         const response = await axiosInstance.post('/auth/refresh', {
          refreshToken: refreshToken,
        });

        if (response.data.accessToken) {
          console.log('Successfully refreshed access token');

          // 새로운 액세스 토큰을 쿠키에 저장
          Cookies.set('accessToken', response.data.accessToken, { expires: 7, path: '/' });

          // 원래 요청에 새로운 액세스 토큰을 포함하여 재요청
          originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

          return axiosInstance(originalRequest);
        } else {
          throw new Error('Failed to refresh access token');
        }
      } catch (refreshError) {
        console.error('Failed to refresh access token:', refreshError);
        // sessionStorage.removeItem('accessToken');
        // sessionStorage.removeItem('refreshToken');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('isLoggedIn');
        window.location.href = '/login'; // 로그인 페이지로 리디렉션
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


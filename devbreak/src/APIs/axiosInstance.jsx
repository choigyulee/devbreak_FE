import axios from "axios";

// localStorage에서 token을 가져오는 방법
const getToken = () => {
  return localStorage.getItem('token');  // 로그인 시 저장된 토큰을 가져옵니다.
};

const axiosInstance = axios.create({
  baseURL: 'https://your-api-endpoint.com', // 실제 API 엔드포인트로 수정
  timeout: 10000, // 요청 타임아웃 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 보내기 전에 헤더에 Bearer Token을 자동으로 추가하는 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

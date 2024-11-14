import axios from 'axios';
import Cookies from 'js-cookie';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER,  // 환경 변수를 import.meta.env로 접근
  timeout: 5000,  // 요청 타임아웃 5000ms (5초)
});

// 토큰을 헤더에 설정하는 함수
const setAuthHeader = (config) => {
  // sessionStorage에서 accessToken을 가져와 헤더에 설정
  const accessToken = sessionStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
};

// 액세스 토큰을 리프레시 토큰으로 갱신하는 함수
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post('/api/accounts/refresh/', { refresh: refreshToken });
    return response.data.access_token; // 갱신된 액세스 토큰 반환
  } catch (error) {
    throw new Error('리프레시 토큰 갱신 실패');
  }
};

// 요청 인터셉터: 요청 전에 헤더에 액세스 토큰을 추가
axiosInstance.interceptors.request.use(
  (config) => setAuthHeader(config),  // setAuthHeader 함수에서 Authorization 헤더 추가
  (error) => Promise.reject(error)   // 요청 실패 시 에러 처리
);

// 응답 인터셉터: 응답에서 에러 발생 시 처리 (예: 401 오류)
axiosInstance.interceptors.response.use(
  (response) => response,  // 정상 응답 처리
  async (error) => {
    const originalRequest = error.config;  // 원본 요청 정보

    // 401 오류: 인증 실패 시 토큰 갱신 시도
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // 무한 루프 방지용 플래그 설정
      
      const refreshToken = Cookies.get('refreshToken'); // 쿠키에서 리프레시 토큰 가져오기
      if (!refreshToken) {
        window.location.href = "/login";  // 리프레시 토큰이 없으면 로그인 페이지로 이동
        return Promise.reject(error);
      }

      try {
        // 리프레시 토큰으로 액세스 토큰을 갱신
        const newAccessToken = await refreshAccessToken(refreshToken);

        // 새로운 액세스 토큰을 세션 스토리지에 저장하고 헤더에 설정
        sessionStorage.setItem('accessToken', `Bearer ${newAccessToken}`);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 원래의 요청을 새 액세스 토큰으로 다시 시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰 갱신 실패 시 로그아웃 처리
        sessionStorage.removeItem('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = "/login"; // 로그인 페이지로 리다이렉트
        return Promise.reject(refreshError);
      }
    }

    // 400 상태 코드 처리: 사용자 인증 관련 오류 (예: 아이디나 비밀번호 틀림)
    if (error.response.status === 400) {
      console.error('사용자 인증 오류:', error.response.data.message);
      // 에러 메시지 출력 또는 사용자에게 알림 처리
    }

    return Promise.reject(error);  // 에러 처리
  }
);

export default axiosInstance;

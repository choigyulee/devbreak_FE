  import axios from 'axios';
  import Cookies from 'js-cookie';
  
  const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL, 
      timeout: 500000, // 5000ms = 5초
  });
      
  axiosInstance.interceptors.request.use(
      config => {
          const accessToken = sessionStorage.getItem('accessToken');
          if (accessToken) {
              config.headers['Authorization'] = `Bearer ${accessToken}`;
          }
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );
  
  axiosInstance.interceptors.response.use(
      response => response,
      async error => {
          const originalRequest = error.config;
      
          if (error.response.status === 401 && !originalRequest._retry) {
              originalRequest._retry = true;
      
              try {
                  const refreshToken = Cookies.get('refreshToken');
                  if (!refreshToken) {
                      throw new Error('리프레시 토큰이 없습니다.');
                  }
  
                  const refreshResponse = await axiosInstance.post('/api/accounts/refresh/', {
                          refresh: refreshToken
                      }
                  )
                  const newAccessToken = refreshResponse.data.access_token;
                  console.log(newAccessToken)
          
                  sessionStorage.setItem('accessToken', `Bearer ${newAccessToken}`);
          
                  originalRequest.headers['Authorization'] = newAccessToken;
                  return axiosInstance(originalRequest);
              } catch (refreshError) {
                  if (refreshError.response && refreshError.response.status === 407) {
                      // 리프레시 토큰 만료 또는 잘못된 경우
                      sessionStorage.removeItem('accessToken');
                      Cookies.remove('refreshToken');
                      window.location.href = "/login";
                  }
                  return Promise.reject(refreshError);
              }
          } else if (error.response.status === 400) {
              // 400 상태 코드 처리: 사용자 인증 관련 오류 (예: 아이디나 비밀번호가 틀림)
              // 여기에 필요한 처리를 추가
              console.error('사용자 인증 오류:', error.response.data.message);
              // 예시: 에러 메시지 출력 또는 사용자에게 알림 처리
          }
      
          return Promise.reject(error);
      }
  );
  
  export default axiosInstance;
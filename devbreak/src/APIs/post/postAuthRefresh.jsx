// 리프레시 토큰을 사용하여 액세스 토큰 갱신
import axiosInstance from "../axiosInstance";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export default async function postAuthRefresh() {
  const refreshToken = cookies.get('refreshToken');

  if (!refreshToken) {
    throw new Error('리프레시 토큰이 없습니다.');
  }

  console.log('리프레시 토큰 사용 중:', refreshToken); 

  try {
    console.log('토큰 재발급 요청 중');
    const response = await axiosInstance.post('/api/auth/refresh',
      { 
        refreshToken: refreshToken,
        withCredentials: true
      }
    );

    if (!response.data.accessToken) {
      console.error('서버에서 새로운 액세스 토큰을 받지 못함');
      throw new Error('서버에서 새로운 액세스 토큰을 받지 못했습니다.');
    }

    const newAccessToken = response.data.accessToken;

    // 새 액세스 토큰을 쿠키에 저장
    cookies.set('accessToken', newAccessToken, { path: '/' });

    return newAccessToken;
  } catch (error) {
    console.error("토큰 갱신 중 오류 발생:", error.response); 
    throw error;
  }
}


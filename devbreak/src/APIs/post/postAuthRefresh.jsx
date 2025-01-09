// 리프레시 토큰을 사용하여 액세스 토큰 갱신
import axiosInstance from "../axiosInstance";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export default async function postAuthRefresh() {
  const refreshToken = cookies.get('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await axiosInstance.post('/api/auth/refresh',
      { 
        refreshToken: refreshToken,
        withCredentials: true
      }
    );

    const newAccessToken = response.data.accessToken;

    // 새 액세스 토큰을 쿠키에 저장
    cookies.set('accessToken', newAccessToken, { path: '/' });

    return newAccessToken;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error; // 에러를 다시 던져서 인터셉터에서 처리하도록
  }
}


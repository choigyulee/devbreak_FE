// 리프레시 토큰을 사용하여 액세스 토큰 갱신
import axiosInstance from "../axiosInstance";

export default async function postAuthRefresh() {
  try {
    const response = await axiosInstance.post('/api/auth/refresh', 
      {
        withCredentials: true
      }
    );

    if (response.status === 200 && response.data.accessToken) {
      return response.data.accessToken;
    } else {
      throw new Error('리프레시 토큰 갱신 실패');
    }
  } catch (error) {
    console.error('액세스 토큰 갱신 실패:', error);
    throw error;
  }
};


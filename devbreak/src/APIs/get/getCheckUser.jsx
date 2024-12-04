// 깃허브 유저 여부 판단
import axiosInstance from '../axiosInstance';

export default async function getCheckUser(username) {
  try {
    const response = await axiosInstance.get(`/api/check-user`);
    return response.data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
}


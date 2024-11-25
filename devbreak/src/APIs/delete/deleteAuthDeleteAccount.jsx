// 회원탈퇴
import axiosInstance from "../axiosInstance";

export default async function deleteAuthDeleteAccount() {
  try {
    const response = await axiosInstance.delete(
      `/api/auth/delete-account`
    );
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}

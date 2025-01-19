// 알림 조회 상태로 변경
import axiosInstance from '../axiosInstance';

export default async function putNoticeNoticeId(noticeId) {
  try {

    const response = await axiosInstance.put(
      `/api/blog/${noticeId}`,
      {
        noticeId: noticeId,
      }
    );
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}


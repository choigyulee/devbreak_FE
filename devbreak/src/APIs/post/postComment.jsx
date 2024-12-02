// 댓글 생성
import axiosInstance from "../axiosInstance";  


export default async function postComment( articleId, content ) {
  try {

    const response = await axiosInstance.post(
      `/api/comment`,
      {
          articleId: articleId,
          content: content
      }
    );
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}
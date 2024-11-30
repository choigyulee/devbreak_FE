// 글 삭제
import axiosInstance from "../axiosInstance";

export default async function deleteArticleArticleId(articleId) {
  try {
    const response = await axiosInstance.delete(
      `/api/article/${articleId}`
    );
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}

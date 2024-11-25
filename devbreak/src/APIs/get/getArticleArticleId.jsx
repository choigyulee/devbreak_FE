// 특정 글 조회
import axiosInstance from "../axiosInstance";

export default async function getArticleArticleId(articleId) {
  try {
    const response = await axiosInstance.get(`/api/article/breakthrough/${articleId}`);
    return response.data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
}

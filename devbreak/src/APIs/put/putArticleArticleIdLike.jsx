// 글 좋아요 기능
import axiosInstance from "../axiosInstance";


export default async function putArticleArticleIdLike(articleId) {
  try {

    const response = await axiosInstance.put(
      `/api/article/${articleId}/like`,
      {
        articleId: articleId,
      }
    );
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}
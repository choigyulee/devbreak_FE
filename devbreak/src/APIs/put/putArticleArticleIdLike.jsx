// 글 좋아요 기능
import axiosInstance from "../axiosInstance";


export default async function putArticleArticleIdLike(articleId, blogId, userId, title, blogName, content, about, problem, solution, likeCount, likeButton, createdAt, updatedAt) {
  try {

    const response = await axiosInstance.put(
      `/api/article/${articleId}/like`,
      {
        articleId: articleId,
        blogId: blogId,
        userId: userId,
        title: title,
        blogName: blogName,
        content: content,
        about: about,
        problem: problem,
        solution: solution,
        likeCount: likeCount,
        likeButton: likeButton,
        createdAt: createdAt,
        updatedAt: updatedAt,
      }
    );
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}
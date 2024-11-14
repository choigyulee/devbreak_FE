// 글 수정
import axiosInstance from "../axiosInstance";

export default async function putArticleArticleId(articleId, blogId, title, blogName, content, about, problem, solution) {
  try {
    const response = await axiosInstance.put(
      `/api/article/${articleId}`,
      {
        blogId: blogId,
        title: title,
        content: content,
        about: about,
        problem: problem,
        solution: solution
      }
    );

    const { articleId, blogId, userId, title, blogName, content, about, problem, solution, likeCount, likeButton, createdAt, updatedAt } = response.data;

    return {
      articleId,
      blogId,
      userId,
      title,
      blogName,
      content,
      about,
      problem,
      solution,
      likeCount,
      likeButton,
      createdAt,
      updatedAt
    };
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}

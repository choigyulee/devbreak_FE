import axiosInstance from "../axiosInstance";

export default async function putArticleArticleId(articleData) {
  try {
    const response = await axiosInstance.put(
      `/api/article/${articleData.articleId}`, // Use articleId from the passed object
      {
        blogId: articleData.blogId,
        title: articleData.title,
        content: articleData.content,
        about: articleData.about,
        problem: articleData.problem,
        solution: articleData.solution
      }
    );
    
    const {
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
    } = response.data;
    
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
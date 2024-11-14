// 블로그 즐겨찾기 토글
import axiosInstance from "../axiosInstance";

export default async function putBlogBlogIdFavorites(blogId, blogName, description) {
  try {
    const response = await axiosInstance.put(
      `/api/blog/${blogId}/favorites`,
      {
        blogName: blogName,
        description: description,
      }
    );

    const { 
      blogId, 
      blogName, 
      description, 
      gitRepoUrl, 
      members, 
      favCount, 
      favButton, 
      createdAt, 
      breakThroughs 
    } = response.data;

    return {
      blogId,
      blogName,
      description,
      gitRepoUrl,
      members,
      favCount,
      favButton,
      createdAt,
      breakThroughs: breakThroughs.map(breakThrough => ({
        articleId: breakThrough.articleId,
        articleTitle: breakThrough.articleTitle,
        createdAt: breakThrough.createdAt 
      }))
    };
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}

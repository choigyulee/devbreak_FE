// 블로그 수정
import axiosInstance from "../axiosInstance";

export default async function putBlogBlogId(blogId, blogName, description, gitRepoUrl, blogMember) {
  try {
    const response = await axiosInstance.put(
      `/api/blog/${blogId}`,
      {
        blogName: blogName,
        description: description,
        gitRepoUrl: gitRepoUrl,
        blogMember: blogMember
      }
    );

    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}

// 블로그 생성
import axiosInstance from "../axiosInstance";  


export default async function postBlog( blogName, description, gitRepoUrl ) {
  try {

    const response = await axiosInstance.post(
      `/api/blog`,
      {
        blogName: blogName,
        description: description,
        gitRepoUrl: gitRepoUrl,
      }
    );
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}
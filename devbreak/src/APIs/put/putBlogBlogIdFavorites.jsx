// 블로그 즐겨찾기 토글
import axiosInstance from "../axiosInstance";


export default async function putBlogBlogIdFavorites(blogId) {
  try {

    const response = await axiosInstance.put(
      `/api/blog/${blogId}/favorites`,
      {
        blogId: blogId,
      }
    );
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}

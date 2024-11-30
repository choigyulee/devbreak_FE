// 블로그 삭제 기능
import axiosInstance from "../axiosInstance";

export default async function deleteBlogBlogId(blogId) {
  try {
    const response = await axiosInstance.delete(`/api/blog/${blogId}`);
    return response.data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
}

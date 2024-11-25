// 블로그 조회
import axiosInstance from "../axiosInstance";

export default async function getBlogNonmemberBlogId(blogId) {
  try {
    const response = await axiosInstance.get(`/api/blog/non-member/${blogId}`);
    return response.data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
}

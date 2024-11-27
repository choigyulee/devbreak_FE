// 이슈 & 커밋 내용 반환
import axiosInstance from "../axiosInstance";

export default async function getIssuesAndCommits(html_url) {
  try {
    const response = await axiosInstance.get(`/api/issues-and-commits?html_url=${encodeURIComponent(html_url)}`);
    return response.data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
}

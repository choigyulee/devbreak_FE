// 특정 댓글 삭제
import axiosInstance from "../axiosInstance";


export default async function deleteCommentArticleIdCommentId( articleId, commentId ) {
  try {
    const response = await axiosInstance.delete(
      `/api/comment/${articleId}/${commentId}`
    );

    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}

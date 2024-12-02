// 특정 댓글 수정
import axiosInstance from "../axiosInstance";


export default async function putCommentCommentId( commentId, articleId, content ) {
  try {

    const response = await axiosInstance.put(
      `/api/comment/${commentId}`,
      {
        articleId: articleId,
        content: content
      }
    );
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}
// 글 내 모든 댓글 조회
import axiosInstance from "../axiosInstance";


export default async function getCommentArticleId(articleId){
    try {
        const response = await axiosInstance.get(
            `/api/comment/${articleId}`,
        )
        return response.data;
    }  catch (error) {
        console.error('에러 발생:', error);
        throw error;
    }
}

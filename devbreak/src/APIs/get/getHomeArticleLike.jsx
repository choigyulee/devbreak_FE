// 내가 좋아요를 누른 글 목록 조회
import axiosInstance from "../axiosInstance";


export default async function getHomeArticleLike(){
    try {
        const response = await axiosInstance.get(
            `/api/home/article/like`,
        )
        return response.data;
    }  catch (error) {
        console.error('에러 발생:', error);
        throw error;
    }
}


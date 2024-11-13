// 글 조회 - 좋아요 수 순
import axiosInstance from "../axiosInstance";


export default async function getHomeArticle(){
    try {
        const response = await axiosInstance.get(
            `/api/home/article`,
        )
        return response.data;
    }  catch (error) {
        console.error('에러 발생:', error);
        throw error;
    }
}


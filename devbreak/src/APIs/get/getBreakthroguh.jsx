// 글 전체 조회
import axiosInstance from "../axiosInstance";


export default async function getBreakthrough(){
    try {
        const response = await axiosInstance.get(
            `/api/breakthrough`,
        )
        return response.data;
    }  catch (error) {
        console.error('에러 발생:', error);
        throw error;
    }
}


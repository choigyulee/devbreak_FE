// 개인 블로그 목록 조회
import axiosInstance from "../axiosInstance";


export default async function getBlog(){
    try {
        const response = await axiosInstance.get(
            `/api/blog`,
        )
        return response.data;
    }  catch (error) {
        console.error('에러 발생:', error);
        throw error;
    }
}

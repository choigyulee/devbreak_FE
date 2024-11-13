// 깃허브ID 불러오기
import axiosInstance from "../axiosInstance";


export default async function getAuthInfo(){
    try {
        const response = await axiosInstance.get(
            `/api/auth/info`,
        )
        return response.data;
    }  catch (error) {
        console.error('에러 발생:', error);
        throw error;
    }
}


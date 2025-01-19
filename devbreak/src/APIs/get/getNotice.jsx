// 개인 모든 알림 조회
import axiosInstance from '../axiosInstance';

  export default async function getNotice(){
    try {
        const response = await axiosInstance.get(
            `/api/notice`,
        )
        return response.data;
    }  catch (error) {
        console.error('에러 발생:', error);
        throw error;
    }
}



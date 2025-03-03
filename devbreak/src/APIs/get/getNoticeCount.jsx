// 미확인 알림 개수 카운트
import axiosInstance from '../axiosInstance';

  export default async function getNoticeCount(){
    try {
        const response = await axiosInstance.get(
            `/api/notice/count`,
        )
        return response.data;
    }  catch (error) {
        console.error('에러 발생:', error);
        throw error;
    }
}


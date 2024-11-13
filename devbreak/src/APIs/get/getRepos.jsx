// 레포 URL 목록 반환
import axiosInstance from "../axiosInstance";


export default async function getRepos(){
    try {
        const response = await axiosInstance.get(
            `/api/repos`,
        )
        return response.data;
    }  catch (error) {
        console.error('에러 발생:', error);
        throw error;
    }
}

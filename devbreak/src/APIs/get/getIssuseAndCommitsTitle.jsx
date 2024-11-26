// 이슈 & 커밋 타이틀 반환
import axiosInstance from "../axiosInstance";


export default async function getIssuesAndCommitsTitle(html_url){
    try {
        const response = await axiosInstance.get(
            `/api/issues-and-commits/title?html_url=${encodeURIComponent(html_url)}`,
        )
        return response.data;
    }  catch (error) {
        console.error('에러 발생:', error);
        throw error;
    }
}

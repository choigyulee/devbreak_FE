// 이슈 & 커밋 타이틀 반환
import axiosInstance from "../axiosInstance";


export default async function getIssuesAndCommitsTitle(){
    try {
        const response = await axiosInstance.get(
            `/api/issues-and-commits/title?html_url=${repoUrl}`,
        )
        return response.data;
    }  catch (error) {
        console.error('에러 발생:', error);
        throw error;
    }
}

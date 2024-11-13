// 이슈 & 커밋 내용 반환
import axiosInstance from "../axiosInstance";


export default async function getIssuesAndCommits(){
    try {
        const response = await axiosInstance.get(
            `/api/issues-and-commits`,
        )
        return response.data;
    }  catch (error) {
        console.error('에러 발생:', error);
        throw error;
    }
}

// 블로그 생성
import axiosInstance from "../axiosInstance";  


export default async function postBlog( blogName, description, gitRepoUrl, blogMember ) {
  try {

    const response = await axiosInstance.post(
      `/api/blog`,
      {
        blogName: blogName,
        description: description,
        gitRepoUrl: gitRepoUrl,
        blogMember: blogMember,
      }
    );
    return response.data;
  } catch (error) {

    // axios 에러 상세 처리
    if (error.response) {
      // 서버가 응답을 반환했지만 2xx 범위를 벗어난 상태 코드
      console.error('Server Error:', error.response.status, error.response.data);
      throw new Error(`Server error: ${error.response.data.message || 'Unknown error occurred'}`);
    } else if (error.request) {
      // 요청이 전송되었지만 응답을 받지 못함
      console.error('Network Error:', error.request);
      throw new Error('Network error: Unable to reach the server');
    } else {
      // 요청 설정 중에 발생한 에러
      console.error('Error:', error.message);
      throw error;
    }
  }
}
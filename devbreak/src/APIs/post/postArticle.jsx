// 글 생성
import axiosInstance from "../axiosInstance";  


export default async function postArticle( blogId, title, content, about, problem, solution){
  try {

      const response = await axiosInstance.post(
          `/api/article`,
          {
            blogId: blogId,
            title: title,
            content: content,
            about: about,
            problem: problem,
            solution: solution,

          }
        );
      return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}
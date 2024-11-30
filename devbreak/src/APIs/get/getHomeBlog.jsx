import axiosInstance from "../axiosInstance";


export default async function getHomeBlog(){
    try {
        const response = await axiosInstance.get(
            `/api/home/blog`,
        )
        return response.data;
    }  catch (error) {
        console.error('에러 발생:', error);
        throw error;
    }
}


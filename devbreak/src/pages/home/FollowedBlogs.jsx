import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import { AiFillPlusCircle } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import getHomeBlogLike from "../../APIs/get/getHomeBlogLike";

function FollowedBlogs() {
  const { isLoggedIn } = useAuth(); 
  const navigate = useNavigate();

  const [myBlogList, setMyBlogList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchMyBlogList = async () => {
    try {
      const blogs = await getHomeBlogLike();
      console.log("Fetched Blogs:", blogs); 
      setMyBlogList(blogs);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    fetchMyBlogList();
  }
}, [isLoggedIn]);


  const handleNavigateToBlog = (blogId) => {
    console.log("Navigating to blog with ID:", blogId);
    navigate(`/blog/${blogId}`);
  };

  if (!isLoggedIn) {
    return null;  // 로그인 상태가 아니면 내용 표시하지 않음
  }

  return (
    <>
      <NavBar isLoggedIn = {isLoggedIn}/>
      <Container>
          <MyBlogContainer>
            <MyBlogContainerText> Blogs what you followed</MyBlogContainerText>
            {myBlogList.map((blog, index) => (
              <MyBlogItem key={index} onClick={() => handleNavigateToBlog(blog.blog_id)}>
                <BlogName>{blog.blog_name}</BlogName>
                <BlogDescription>{blog.description}</BlogDescription>
              </MyBlogItem>
            ))}
          </MyBlogContainer>
      </Container>
    </>
  );
}

export default FollowedBlogs;


const Container = styled.div`
  font-family: "Pretendard";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyBlogContainer = styled.div`
  margin: 60px auto;
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MyBlogContainerText = styled.div`
  margin: 0 auto;
  min-width: 930px;
  font-size: 25px;
  line-height: 40px;
  margin-bottom: 20px;
`;

const MyBlogItem = styled.div`
  align-items: center;
  margin: 0 auto;
  width: 930px;
  min-height: 155px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.05);
  margin-bottom: 16px;
  padding: 2.3rem 3rem;
  cursor: pointer;

  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 10px rgba(2, 247, 152, 0.25);
  }
`;

const BlogName = styled.div`
  font-size: 28px;
  font-family: "Urbanist";
  font-weight: bold;
  margin-bottom: 16px;
`;

const BlogDescription = styled.div`
  font-size: 22px;
  font-family: "Urbanist";
  word-wrap: break-word;
  white-space: normal;
  word-break: break-word;
`;

const MyBlogItem2 = styled.div`
  margin: 0 auto;
  min-width: 930px;
  min-height: 155px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.05);
  margin-bottom: 16px;
  padding: 2.3rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: #02f798;
    border: 3px solid #02f798;
    box-shadow: 0px 0px 10px rgba(2, 247, 152, 0.25);
  }
`;

const CreateContainer = styled.div`
  margin: 98px auto;
  min-width: 930px;
  height: 445px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CreateContainerText = styled.div`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 50px;
  line-height: 40px;
  text-align: center;
`;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import GoToButton from "../../components/GoToButton";
import { AiFillPlusCircle } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import getBlog from "../../APIs/get/getBlog";

function WorkspacePage() {
  const { isLoggedIn } = useAuth();
  // const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const navigate = useNavigate();

  const [myBlogList, setMyBlogList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyBlogList = async () => {
      try {
        const blogs = await getBlog();
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

  const handleNavigateToMakeBlog = () => {
    if (isLoggedIn) {
      navigate("/workspace/makeblog");
    }
  };

  const handleNavigateToBlog = (blogId) => {
    // blogId를 이용해 해당 블로그의 상세 페이지로 이동
    navigate(`/blog/${blogId}`);
  };

  if (!isLoggedIn) {
    return null; // 로그인 상태가 아니면 내용 표시하지 않음
  }

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        {myBlogList.length > 0 ? (
          <MyBlogContainer>
            <MyBlogContainerText> You are currently running these blogs.</MyBlogContainerText>
            {myBlogList.map((blog, index) => (
              <MyBlogItem key={index} onClick={() => handleNavigateToBlog(blog.blogId)}>
                <BlogName>{blog.blogName}</BlogName>
                <BlogDescription>{blog.description}</BlogDescription>
              </MyBlogItem>
            ))}
            <MyBlogItem2>
              <AiFillPlusCircle size={45} onClick={handleNavigateToMakeBlog} />
            </MyBlogItem2>
          </MyBlogContainer>
        ) : (
          <CreateContainer>
            <CreateContainerText>
              Add your project members <br />
              and transform GitHub repository into tech blog
            </CreateContainerText>
            <GoToButton text="create a new tech blog" onClick={handleNavigateToMakeBlog} />
          </CreateContainer>
        )}
      </Container>
    </>
  );
}

export default WorkspacePage;

const Container = styled.div`
  font-family: "Pretendard";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyBlogContainer = styled.div`
  margin: 0vh 20vw 10vh 20vw;
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MyBlogContainerText = styled.div`
  margin: 0 auto;
  text-align: left;
  width: 100%;
  min-width: 930px;
  font-size: 3vh;
  line-height: 3vh;
  margin-bottom: 20px;
`;

const MyBlogItem = styled.div`
  align-items: center;
  margin: 0 auto;
  width: 50vw;
  height: 15vh;
  border-radius: 3vh;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.05);
  margin-bottom: 16px;
  padding: 2.2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  cursor: pointer;

  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 10px rgba(2, 247, 152, 0.25);
  }
`;

const BlogName = styled.div`
  font-size: 2.8vh;
  font-family: "Urbanist";
  font-weight: bold;
`;

const BlogDescription = styled.div`
  font-size: 2.3vh;
  font-family: "Urbanist";
  word-wrap: break-word;
  white-space: normal;
  word-break: break-word;
`;

const MyBlogItem2 = styled.div`
  margin: 0 auto;
  width: 50vw;
  height: 15vh;
  border-radius: 3vh;
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
    border: 1px solid #02f798;
    box-shadow: 0px 0px 10px rgba(2, 247, 152, 0.25);
  }
`;

const CreateContainer = styled.div`
  margin: 0vh 20vw 10vh 20vw;
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

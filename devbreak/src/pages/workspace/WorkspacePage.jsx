import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import GoToButton from '../../components/GoToButton';
import { AiFillPlusCircle } from 'react-icons/ai';

function WorkspacePage() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <Container>
        <MyBlogContainer>
          <MyBlogContainerText> You are currently running these blogs.</MyBlogContainerText>
            <MyBlogItem>
              <BlogName>blogName</BlogName>
              <BlogDescription>description</BlogDescription>
            </MyBlogItem>
            <MyBlogItem2>
              <AiFillPlusCircle size={45} onClick={() => navigate(`/workspace/makeblog`)} />
            </MyBlogItem2>
        </MyBlogContainer>
        <CreateContainer>
          <CreateContainerText>
            Add your project members <br />
            and transform GitHub repository into tech blog
          </CreateContainerText>
          <GoToButton text="create a new tech blog" onClick={() => navigate(`/workspace/makeblog`)} />
        </CreateContainer>
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
  margin: 98px 167px;
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;

const MyBlogContainerText = styled.div`
  font-size: 25px;
  line-height: 40px;
  margin-bottom: 20px;
`;


const MyBlogItem = styled.div`
  align-items: center;
  min-width: 930px;
  min-height: 155px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.05);
  margin-bottom: 16px;
  padding: 2.3rem 3rem;
  cursor: pointer;

  &:hover {
    color: #02f798;
    border: 3px solid #02f798;
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

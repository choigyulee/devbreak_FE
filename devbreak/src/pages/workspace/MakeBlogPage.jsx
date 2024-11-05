import React, { useState } from 'react';
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import GoToButton from "../../components/GoToButton";
import FormField from "../../components/FormField";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
// import axios from 'axios';  // API 호출을 위해 axios를 사용할 수 있습니다.

function MakeBlogPage() {
  // 상태 관리: 블로그 이름, 설명, GitHub 링크
  const [formData, setFormData] = useState({
    blogName: '',
    description: '',
    gitRepoUrl: ''
  });

  // 입력 값 변경 시 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 폼 제출 시 API 요청 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { blogName, description, gitRepoUrl } = formData;

    const requestBody = {
      blogName,       // 블로그 이름
      description,    // 블로그 설명
      gitRepoUrl      // GitHub 리포지토리 링크
    };

    try {
      // const response = await axios.post('API_URL', requestBody);

      console.log('Form submitted:', requestBody);
      // 여기서 response를 처리하거나 알림을 띄울 수 있습니다.

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        <FormContainer>
          <Title>Create a new tech blog</Title>
          <Subtitle>A little note: Anyone on the Internet can see this tech blog. <br />
            Please fill out all fields marked with an asterisk (*).</Subtitle>

          <Form onSubmit={handleSubmit}>
            <FormField label="Blog name" required>
              <Input
                type="text"
                name="blogName"
                value={formData.blogName}
                onChange={handleChange}
                required
              />
            </FormField>

            <FormField label="Description" required>
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormField>

            <FormField label="Github repository link" required>
              <Input
                type="url"
                name="gitRepoUrl"  // 'githubLink'에서 'gitRepoUrl'로 수정
                value={formData.gitRepoUrl}
                onChange={handleChange}
                required
              />
            </FormField>

            <ButtonContainer>
              <GoToButton text="create blog" type="submit" />  {/* type="submit"으로 수정 */}
            </ButtonContainer>
          </Form>

        </FormContainer>
      </Container>
    </>
  );
}

export default MakeBlogPage;

const Container = styled.div`
  font-family: "Pretendard";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 73vw;
  margin-top: 60px;
`;

const Title = styled.h1`
  font-size: 45px;
  margin: 98px 0 15px 0;

  font-weight: 500;
`;

const Subtitle = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  font-size: 15px;
  line-height: 25px;
  font-weight: 500;
  margin-bottom: 64px;
  padding: 10px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;

const ButtonContainer = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  width: 100%;
`;


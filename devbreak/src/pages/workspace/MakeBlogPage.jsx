import React, { useState } from 'react';
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import GoToButton from "../../components/GoToButton";
import FormField from "../../components/Workspace/FormField";
import Input from "../../components/Workspace/Input";
import TextArea from "../../components/Workspace/TextArea";
import Dropdown from '../../components/Breakthrough/Dropdown';

const githubRepos = [
  { id: 1, title: 'Tech Blog A' },
  { id: 2, title: 'Tech Blog B' },
  { id: 3, title: 'Tech Blog C' },
  { id: 4, title: 'Tech Blog D' },
  { id: 5, title: 'Tech Blog E' },
];

function MakeBlogPage() {
  const [formData, setFormData] = useState({
    blogName: '',
    description: '',
    gitRepoUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGitRepoSelection = (repo) => {
    setFormData((prev) => ({
      ...prev,
      gitRepoUrl: repo, // GitHub 리포지토리 URL 선택
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { blogName, description, gitRepoUrl } = formData;

    const requestBody = {
      blogName,   
      description,  
      gitRepoUrl, 
    };

    try {
      // const response = await axios.post('API_URL', requestBody);
      console.log('Form submitted:', requestBody);

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
              <Dropdown
                selectedValue={formData.gitRepoUrl}
                setSelectedValue={handleGitRepoSelection}
                items={githubRepos}
              />
            </FormField>

            <ButtonContainer>
              <GoToButton text="create blog" onClick={handleSubmit} /> 
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
  margin-bottom: 300px;
`;

const FormContainer = styled.div`
  margin: 60px auto;
  align-items: center;
  min-width: 930px;
`;

const Title = styled.h1`
  font-size: 45px;
  margin-bottom: 15px;
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

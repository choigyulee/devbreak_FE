import React, { useState } from 'react';
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import GoToButton from "../../components/GoToButton";

function MakeBlogPage() {

  const [formData, setFormData] = useState({
    blogName: '',
    description: '',
    githubLink: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <NavBar></NavBar>
      <Container>
        <FormContainer>
          <Title>Create a new tech blog</Title>
          <Subtitle>A little note: Anyone on the Internet can see this tech blog. <br />
            Please fill out all fields marked with an asterisk (*).</Subtitle>

          <Form>
            <FormField>
              <Label>Blog name<Required>*</Required></Label>
              <Input
                type="text"
                name="blogName"
                value={formData.blogName}
                onChange={handleChange}
                required
              />
            </FormField>

            <FormField>
              <Label>Description<Required>*</Required></Label>
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormField>

            <FormField>
              <Label>Github repository link<Required>*</Required></Label>
              <Input
                type="url"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                required
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
  align-items: center;
`

const FormContainer = styled.div`
  margin: auto 167px;
  width: 75vw;
`;

const Title = styled.h1`
  font-size: 45px;
  margin: 108px 0 15px 0;
  font-weight: 500;
`;

const Subtitle = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  font-size: 18px;
  line-height: 25px;
  font-weight: 500;
  margin-bottom: 64px;
  padding: 10px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`

const FormField = styled.div`
  margin-bottom: 48px;
`;

const Label = styled.label`
  font-size: 25px;
  font-weight: 500;
  margin-left: 0px;
`;

const Required = styled.span`
  color: #FF0000;
  font-size: 25px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  height: 67px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  font-size: 20px;
  color :#ffffff;
  padding: 30px;
  margin-left: 0px;
  margin-top: 10px;
  
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 190px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  font-size: 20px;
  color: #ffffff;
  padding: 30px;
  margin-left: 0;
  margin-top: 10px;
  resize: vertical;

  overflow: auto; /* 스크롤 가능하게 설정 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤바 숨김 */

  /* 웹킷 브라우저에서 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.button`
  margin-top: 60px;
`
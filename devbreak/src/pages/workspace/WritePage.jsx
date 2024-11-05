import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import GoToButton from "../../components/GoToButton";
import FormField from "../../components/FormField";
import GitButton from "../../components/GitButton";
import TextArea from "../../components/TextArea";
// import axios from 'axios';

function WritePage() {
  // 상태 관리: 제목, 본문, 선택된 항목들 (About, Problem, Solution)
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const [selectedAbout, setSelectedAbout] = useState('pick from the Github repository');
  const [selectedProblem, setSelectedProblem] = useState('pick from the Github repository');
  const [selectedSolution, setSelectedSolution] = useState('pick from the Github repository');

  const [issues, setIssues] = useState([]); // Github 이슈 목록
  const [commits, setCommits] = useState([]); // Github 커밋 목록

  // Github 이슈 목록 가져오기 (API 호출 예시, 실제 API로 바꿔주세요)
  // useEffect(() => {
  //   const fetchIssues = async () => {
  //     try {
  //       // 예시: GitHub 이슈 목록을 API에서 가져오기
  //       const response = await fetch('https://api.github.com/repos/LikeLion-Project-3Team/issues');
  //       const data = await response.json();
  //       setIssues(data);
  //     } catch (error) {
  //       console.error('Error fetching issues:', error);
  //     }
  //   };

  //   fetchIssues();
  // }, []);

  // Github 커밋 목록 가져오기 (API 호출 예시, 실제 API로 바꿔주세요)
  // useEffect(() => {
  //   const fetchCommits = async () => {
  //     try {
  //       // 예시: GitHub 커밋 목록을 API에서 가져오기
  //       const response = await fetch('https://api.github.com/repos/LikeLion-Project-3Team/commits');
  //       const data = await response.json();
  //       setCommits(data);
  //     } catch (error) {
  //       console.error('Error fetching commits:', error);
  //     }
  //   };

  //   fetchCommits();
  // }, []);

  // 제목이나 본문 입력 시 상태 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      content: formData.content,
      about: selectedAbout,
      problem: selectedProblem,
      solution: selectedSolution,
      blogId: blogId,
    };
    console.log('Form submitted:', payload);
  };

  return (
    <>
      <NavBar />
      <Container>
        <FormContainer>
          <Form>
            <FormField label="Breakthrough Title" required>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </FormField>

            <FormField label="Add related issue or commit (optional)">
              <GitButton
                label="About"
                selectedValue={selectedAbout}
                items={issues}
                setSelectedValue={setSelectedAbout}
              />
              <GitButton
                label="Problem"
                selectedValue={selectedProblem}
                items={commits}
                setSelectedValue={setSelectedProblem}
              />
              <GitButton
                label="Solution"
                selectedValue={selectedSolution}
                items={commits}
                setSelectedValue={setSelectedSolution}
              />
            </FormField>

            <FormField label="Body" required>
              <TextArea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </FormField>

            <ButtonContainer>
              <GoToButton text="post" onClick={handleSubmit} />
            </ButtonContainer>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
}

export default WritePage;

const Container = styled.div`
  font-family: "Pretendard";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  margin: 98px 167px;
  width: 75vw;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;

const Input = styled.input`
  width: 100%;
  height: 67px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  font-size: 20px;
  color: #ffffff;
  padding: 30px;
  margin-left: 0px;
  margin-top: 10px;

  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  width: 100%;
`;


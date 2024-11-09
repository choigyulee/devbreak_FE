import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import GoToButton from "../../components/GoToButton";
import FormField from "../../components/Workspace/FormField";
import Dropdown from "../../components/Breakthrough/Dropdown";
import TextArea from "../../components/Workspace/TextArea";

function WritePage() {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const [selectedAbout, setSelectedAbout] = useState('pick from the Github repository');
  const [selectedProblem, setSelectedProblem] = useState('pick from the Github repository');
  const [selectedSolution, setSelectedSolution] = useState('pick from the Github repository');

  const [issuesAndCommits, setIssuesAndCommits] = useState([]);

  const mockData = [
    { type: 'issue', title: 'Issue 1' },
    { type: 'issue', title: 'Issue 2' },
    { type: 'issue', title: 'Issue 3' },
    { type: 'commit', title: 'Commit 1' },
    { type: 'commit', title: 'Commit 2' },
    { type: 'commit', title: 'Commit 3' },
  ];

  useEffect(() => {
    // setIssuesAndCommits(response.data); // 실제 API 호출 시

    // 임시로 목 데이터를 사용
    setIssuesAndCommits(mockData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      content: formData.content,
      about: selectedAbout,
      problem: selectedProblem,
      solution: selectedSolution,
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
              <FormItem>
              <Label>about</Label>
              <Dropdown
                label="About"
                selectedValue={selectedAbout}
                setSelectedValue={setSelectedAbout}
                items={issuesAndCommits}
              />
              </FormItem>
              <FormItem>
              <Label>problem</Label>
              <Dropdown
                label="Problem"
                selectedValue={selectedProblem}
                setSelectedValue={setSelectedProblem}
                items={issuesAndCommits}
              />
              </FormItem>
              <FormItem>
              <Label>solution</Label>
              <Dropdown
                label="Solution"
                selectedValue={selectedSolution}
                setSelectedValue={setSelectedSolution}
                items={issuesAndCommits}
              />
               </FormItem>
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
              <GoToButton text="Post" onClick={handleSubmit} />
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
  margin-bottom: 300px;
`;

const FormContainer = styled.div`
  margin: 60px auto;
  align-items: center;
  min-width: 930px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: row;
`

const Input = styled.input`
  width: 100%;
  height: 67px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  font-size: 20px;
  color: #ffffff;
  padding: 30px;
  margin-top: 10px;

  &:focus {
    outline: none;
  }
`;

const Label = styled.div`
  font-size: 25px;
  height: 67px;
  width: 150px;
  padding: 25px 20px 0 0 ;
`

const ButtonContainer = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

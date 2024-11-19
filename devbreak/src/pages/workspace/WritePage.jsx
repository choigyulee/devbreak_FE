import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import GoToButton from "../../components/GoToButton";
import FormField from "../../components/Workspace/FormField";
import Dropdown from "../../components/Breakthrough/Dropdown";
import MarkdownEditor from "../../components/WritePageItem/MarkdownEditor ";
import { useAuth } from "../../AuthContext";

function WritePage() {
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [selectedAbout, setSelectedAbout] = useState("pick your programming language");
  const [selectedProblem, setSelectedProblem] = useState("pick from the Github repository");
  const [selectedSolution, setSelectedSolution] = useState("pick from the Github repository");

  const [issuesAndCommits, setIssuesAndCommits] = useState([]);

  const mockData = [
    { type: "issue", title: "Issue 1" },
    { type: "issue", title: "Issue 2" },
    { type: "issue", title: "Issue 3" },
    { type: "commit", title: "Commit 1" },
    { type: "commit", title: "Commit 2" },
    { type: "commit", title: "Commit 3" },
  ];

  useEffect(() => {
    setIssuesAndCommits(mockData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지
    const payload = {
      title: formData.title,
      content: formData.content,
      language: selectedAbout,
      problem: selectedProblem,
      solution: selectedSolution,
    };

    // 콘솔 로그에 JSON 형태로 출력
    console.log("Form submitted:", JSON.stringify(payload, null, 2));
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <FormContainer>
          {/* form에 onSubmit 이벤트 핸들러 추가 */}
          <Form onSubmit={handleSubmit}>
            <FormField label="Breakthrough Title" required>
              <Input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </FormField>

            <FormField label="Add related issue or commit (optional)">
              <FormItem>
                <Label>language</Label>
                <Dropdown
                  label="language"
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
              <MarkdownEditor
                content={formData.content}
                setContent={(value) => setFormData((prev) => ({ ...prev, content: value }))}
              />
            </FormField>

            <ButtonContainer>
              {/* 버튼에서 handleSubmit를 호출하지 않아도 form의 onSubmit으로 처리 */}
              <GoToButton text="Post" />
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
  margin: 3vh 20vw 3vh 20vw;
  align-items: center;
  min-width: 930px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: row;
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
  margin-top: 10px;

  &:focus {
    outline: none;
  }
`;

const Label = styled.div`
  font-size: 25px;
  height: 67px;
  width: 150px;
  padding: 25px 20px 0 0;
`;

const ButtonContainer = styled.div`
  margin-top: 3vh;
  display: flex;
  justify-content: center;
  width: 100%;
`;

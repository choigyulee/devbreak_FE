import { useState } from "react";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import GoToButton from "../../components/GoToButton";
import FormField from "../../components/Workspace/FormField";
import Input from "../../components/Workspace/Input";
import TextArea from "../../components/Workspace/TextArea";
import Dropdown from "../../components/Breakthrough/Dropdown";
import PropTypes from "prop-types";
import { useAuth } from "../../AuthContext";
import getRepos from "../../APIs/get/getRepos";
import postBlog from "../../APIs/post/postBlog";

const githubRepos = [
  { id: 1, title: "Tech Blog A" },
  { id: 2, title: "Tech Blog B" },
  { id: 3, title: "Tech Blog C" },
  { id: 4, title: "Tech Blog D" },
  { id: 5, title: "Tech Blog E" },
];

function MakeBlogPage() {
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    blogName: blogName,
    description: description,
    gitRepoUrl: "pick one from your Github account",
    blogMember: blogMember
  });

  const [githubRepos, setGithubRepos] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchRepos();  // 로그인된 상태에서만 레포지토리 목록을 가져옴
    }
  }, [isLoggedIn]);

  const fetchRepos = async () => {
    try {
      const repos = await getRepos();
      setGithubRepos(repos);  // 상태 업데이트
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
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
    const { blogName, description, gitRepoUrl, blogMember } = formData;

    const requestBody = {
      blogName,
      description,
      gitRepoUrl,
      blogMember,
    };

    try {
      const response = await postBlog(blogName, description, gitRepoUrl);
      console.log("Blog created successfully:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <FormContainer>
          <Title>Create a new tech blog</Title>
          <Subtitle>
            A little note: Anyone on the Internet can see this tech blog. <br />
            Please fill out all fields marked with an asterisk (*).
          </Subtitle>

          <Form onSubmit={handleSubmit}>
            <FormField label="Blog name" required>
              <Input type="text" name="blogName" value={formData.blogName} onChange={handleChange} required />
            </FormField>

            <FormField label="Description" required>
              <TextArea name="description" value={formData.description} onChange={handleChange} required />
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

MakeBlogPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, // isLoggedIn prop validation 추가
};

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

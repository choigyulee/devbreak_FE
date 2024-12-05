/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams 추가
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import GoToButton from "../../components/GoToButton";
import FormField from "../../components/Workspace/FormField";
import GitTitleDropdown from "../../components/WritePageItem/GitTitleDropdown";
import LanguageDropdown from "../../components/WritePageItem/LanguageDropdown";
import { useAuth } from "../../context/AuthContext";
import MarkdownEditor from "../../components/WritePageItem/MarkdownEditor ";
import getIssuesAndCommitsTitle from "../../APIs/get/getIssuseAndCommitsTitle";
import postArticle from "../../APIs/post/postArticle";
import getBlogBlogId from "../../APIs/get/getBlogBlogId";
import Footer from "../../components/Footer";

function WritePage() {
  const { blogId } = useParams(); // blogId 받아오기
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [selectedAbout, setSelectedAbout] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [selectedSolution, setSelectedSolution] = useState("");

  const [issuesAndCommits, setIssuesAndCommits] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태만 유지
  const [gitRepoUrl, setGitRepoUrl] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(""); // 현재 활성화된 드롭다운

  const languageOptions = ["Java", "HTML", "JavaScript", "Python", "TypeScript", "Kotlin", "C#", "C++", "CSS", "Swift"];

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      setIsLoading(true);

      try {
        // 블로그 ID로 블로그 정보 가져오기
        const blogData = await getBlogBlogId(blogId);
        const { git_repo_url } = blogData; // git_repo_url 추출
        // setGitRepoUrl(git_repo_url); // 상태에 저장

        // // 확인용 콘솔 로그 추가
        // console.log("Fetching issues and commits for URL:", git_repo_url);
        // console.log("Fetching issues and commits for URL:", gitRepoUrl);

        // // git_repo_url을 이용해 이슈 및 커밋 제목 가져오기
        // const issuesData = await getIssuesAndCommitsTitle(gitRepoUrl);

        if (!git_repo_url) {
          console.error("Git repository URL is missing.");
          return;
        }

        setGitRepoUrl(git_repo_url); // 상태에 저장

        // 확인용 콘솔 로그 추가
        console.log("Fetching issues and commits for URL:", git_repo_url);

        // git_repo_url을 이용해 이슈 및 커밋 제목 가져오기
        const issuesData = await getIssuesAndCommitsTitle(git_repo_url);
        setIssuesAndCommits(issuesData); // 이슈 및 커밋 제목 상태에 저장
      } catch (error) {
        console.error("Failed to fetch issues and commits", error); // 로그만 남김
      } finally {
        setIsLoading(false);
      }
    };

    if (blogId && isLoggedIn) {
      fetchBlogData(); // 블로그 ID가 존재하고 로그인된 경우에만 데이터 fetch
    }
  }, [isLoggedIn, blogId, navigate, gitRepoUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, content } = formData;

    if (!title || !content) {
      console.error("Please fill in all required fields"); // 에러 메시지를 로그로만 처리
      return;
    }

    setIsLoading(true);

    try {
      const response = await postArticle(
        blogId, // blogId 사용
        title,
        content,
        selectedAbout,
        selectedProblem,
        selectedSolution
      );

      console.log("Article posted successfully:", response);
      navigate(`/blog/${blogId}`); // 블로그 페이지로 이동
    } catch (err) {
      console.error("Failed to post article:", err); // 에러 로그만 남김
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? "" : dropdownName)); // 같은 이름이면 닫음
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormField label="Breakthrough Title" required>
              <Input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </FormField>
            <FormField label="Add related issue or commit (optional)">
              <FormItem>
                <Label>Language</Label>
                <LanguageDropdown
                  selectedValue={selectedAbout}
                  setSelectedValue={setSelectedAbout}
                  items={languageOptions}
                  isOpen={activeDropdown === "language"} // 활성 상태 확인
                  toggleDropdown={() => setActiveDropdown(activeDropdown === "language" ? "" : "language")} // 토글
                />
              </FormItem>
              <FormItem>
                <Label>Problem</Label>
                <GitTitleDropdown
                  selectedValue={selectedProblem}
                  setSelectedValue={setSelectedProblem}
                  items={issuesAndCommits}
                  isOpen={activeDropdown === "problem"} // 활성 상태 확인
                  toggleDropdown={() => setActiveDropdown(activeDropdown === "problem" ? "" : "problem")} // 토글
                />
              </FormItem>
              <FormItem>
                <Label>Solution</Label>
                <GitTitleDropdown
                  label="Solution"
                  selectedValue={selectedSolution}
                  setSelectedValue={setSelectedSolution}
                  items={issuesAndCommits}
                  isOpen={activeDropdown === "solution"} // 활성화 상태 전달
                  toggleDropdown={() => setActiveDropdown(activeDropdown === "solution" ? "" : "solution")} // 토글
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
              <GoToButton type="submit" text="Post" disabled={isLoading} />
            </ButtonContainer>
          </Form>
        </FormContainer>
      </Container>
      <Footer />
    </>
  );
}

export default WritePage;

// 스타일 정의는 기존 그대로 유지
const Container = styled.div`
  font-family: "Pretendard";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  margin: 0vh 13vw 3vh 13vw;
  align-items: center;
  min-width: 60vw;
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

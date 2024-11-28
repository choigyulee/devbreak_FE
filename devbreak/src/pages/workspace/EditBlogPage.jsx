import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import GoToButton from "../../components/GoToButton";
import FormField from "../../components/Workspace/FormField";
import GitTitleDropdown from "../../components/WritePageItem/GitTitleDropdown";
import LanguageDropdown from "../../components/WritePageItem/LanguageDropdown";
import { useAuth } from "../../context/AuthContext";
import MarkdownEditor from "../../components/WritePageItem/MarkdownEditor ";
import getIssuesAndCommitsTitle from "../../APIs/get/getIssuseAndCommitsTitle";
import getBlogBlogId from "../../APIs/get/getBlogBlogId";
import putArticleArticleId from "../../APIs/put/putArtticleArticleId";
import getArticleArticleId from "../../APIs/get/getArticleArticleId";

function EditWritePage() {
  const { blogId, articleId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    about: '',
    problem:'',
    solution:'',
  });

  const [issuesAndCommits, setIssuesAndCommits] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gitRepoUrl, setGitRepoUrl] = useState('');

  const languageOptions = [
    "Java", "HTML", "JavaScript", "Python", "TypeScript", "Kotlin", "C#", "C++", "CSS", "Swift"
  ];

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const blogData = await getBlogBlogId(blogId);
        const { git_repo_url } = blogData; 
        setGitRepoUrl(git_repo_url);

        // git_repo_url을 이용해 이슈 및 커밋 제목 가져오기
        const issuesData = await getIssuesAndCommitsTitle(gitRepoUrl);
        setIssuesAndCommits(issuesData); // 이슈 및 커밋 제목 상태에 저장

        if (articleId) {
          // 기존 글 수정일 경우, articleId로 글 정보 가져오기
          const articleData = await getArticleArticleId(articleId); // 이 함수는 글 데이터를 가져오는 API입니다.
          setFormData({
            articleId: articleData.articleId,
            title: articleData.title,
            content: articleData.content,
            about: articleData.about,
            problem: articleData.problem,
            solution: articleData.solution,
          });
        }
      } catch (error) {
        setError("Failed to fetch issues and commits");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (blogId && isLoggedIn) {
      fetchBlogData(); // 블로그 ID가 존재하고 로그인된 경우에만 데이터 fetch
    }
  }, [isLoggedIn, blogId, navigate, articleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, content, about, problem, solution } = formData;

    if (!title || !content || !about || !problem || !solution) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (articleId) {
        // 글 수정 (PUT)
        response = await putArticleArticleId(
          articleId, blogId, title, content, about, problem, solution
        );
        console.log("Article updated successfully:", response);
      }

      navigate(`/breakthrough/${articleId}`);
    } catch (err) {
      console.error("Failed to post article:", err);
      setError("Failed to post article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
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
                <Label>Language</Label>
                <LanguageDropdown
                  label="language"
                  selectedValue={formData.about}
                  setSelectedValue={formData.about}
                  items={languageOptions}
                />
              </FormItem>
              <FormItem>
                <Label>Problem</Label>
                <GitTitleDropdown
                  label="Problem"
                  selectedValue={formData.problem}
                  setSelectedValue={formData.problem}
                  items={issuesAndCommits}
                />
              </FormItem>
              <FormItem>
                <Label>Solution</Label>
                <GitTitleDropdown
                  label="Solution"
                  selectedValue={formData.solution}
                  setSelectedValue={formData.solution}
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
              <GoToButton
                type="submit"
                text="Update"
                onClick={handleSubmit}
                disabled={isLoading}
              />
            </ButtonContainer>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
}

export default EditWritePage;

// Styled components
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

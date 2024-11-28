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
  const { articleId } = useParams();
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
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gitRepoUrl, setGitRepoUrl] = useState('');

  const languageOptions = [
    "Java", "HTML", "JavaScript", "Python", "TypeScript", "Kotlin", "C#", "C++", "CSS", "Swift"
  ];

  useEffect(() => {
    const fetchArticleData = async () => {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Fetch the specific article data
        const articleData = await getArticleArticleId(articleId);
        
        // Populate form data
        setFormData({
          blogId: articleData.blogId,
          title: articleData.title,
          content: articleData.content
        });

        // Set selected values
        setSelectedAbout(articleData.about);
        setSelectedProblem(articleData.problem);
        setSelectedSolution(articleData.solution);

        // Fetch blog data to get git repo URL
        const blogData = await getBlogBlogId(articleData.blogId);
        const { git_repo_url } = blogData;
        setGitRepoUrl(git_repo_url);

        // Fetch issues and commits
        const issuesData = await getIssuesAndCommitsTitle(git_repo_url);
        setIssuesAndCommits(issuesData);

      } catch (error) {
        setError("Failed to fetch article data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (articleId && isLoggedIn) {
      fetchArticleData();
    }
  }, [isLoggedIn, articleId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { blogId, title, content } = formData;
  
    if (!title || !content || !selectedAbout || !selectedProblem || !selectedSolution) {
      setError("Please fill in all required fields");
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await putArticleArticleId({
        articleId, // Pass articleId as part of the object
        blogId, // Use the original blogId from fetched data
        title,
        content,
        about: selectedAbout,
        problem: selectedProblem,
        solution: selectedSolution
      });
  
      console.log("Article updated successfully:", response);
      navigate(`/blog/${blogId}`); // Navigate back to blog page
    } catch (err) {
      console.error("Failed to update article:", err);
      setError("Failed to update article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of the component remains the same as in the previous version
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
                  selectedValue={selectedAbout}
                  setSelectedValue={setSelectedAbout}
                  items={languageOptions}
                />
              </FormItem>
              <FormItem>
                <Label>Problem</Label>
                <GitTitleDropdown
                  label="Problem"
                  selectedValue={selectedProblem}
                  setSelectedValue={setSelectedProblem}
                  items={issuesAndCommits}
                />
              </FormItem>
              <FormItem>
                <Label>Solution</Label>
                <GitTitleDropdown
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
              <GoToButton 
                type="submit" 
                text="Update"
                disabled={isLoading}
                onClick={handleSubmit}
              />
            </ButtonContainer>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
}

export default EditWritePage;


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

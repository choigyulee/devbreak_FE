/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import GoToButton from "../../components/GoToButton";
import FormField from "../../components/Workspace/FormField";
import Input from "../../components/Workspace/Input";
import TextArea from "../../components/Workspace/TextArea";
import Dropdown from "../../components/Workspace/Dropdown";
import { useAuth } from "../../context/AuthContext";
import getRepos from "../../APIs/get/getRepos";
import getAuthInfo from "../../APIs/get/getAuthInfo";
import getBlogBlogId from "../../APIs/get/getBlogBlogId";
import putBlogBlogId from "../../APIs/put/putBlogBlogId";
import Footer from "../../components/Footer";

function EditBlogPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [formData, setFormData] = useState({
    blogName: "",
    description: "",
    gitRepoUrl: "",
    blogMember: [],
  });

  const [githubRepos, setGithubRepos] = useState([]);
  const [newMember, setNewMember] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }
      try {
        await fetchBlogData();
        await fetchRepos();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isLoggedIn, navigate, blogId]);

  const fetchBlogData = async () => {
    try {
      const blogData = await getBlogBlogId(blogId);
      setFormData((prev) => ({
        ...prev,
        blogName: blogData.blog_name,
        description: blogData.description,
        gitRepoUrl: blogData.git_repo_url,
        blogMember: blogData.members,
      }));
    } catch (error) {
      setError(error);
    }
  };

  const fetchRepos = async () => {
    try {
      const repos = await getRepos();
      const userData = await getAuthInfo();
      console.log("userName:", userData.userName);
      setGithubRepos(repos);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
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
      gitRepoUrl: repo,
    }));
  };

  const handleMemberChange = (e) => {
    const { value } = e.target;
    setNewMember(value); // 새로운 GitHub ID 입력값 업데이트
  };

  const handleAddContributor = () => {
    if (newMember.trim() === "") return; // 빈 값은 추가하지 않음
    setFormData((prev) => ({
      ...prev,
      blogMember: [...prev.blogMember, newMember.trim()],
    }));
    setNewMember(""); // 입력란 비우기
  };

  const handleDeleteMember = (memberToDelete) => {
    setFormData((prev) => ({
      ...prev,
      blogMember: prev.blogMember.filter((member) => member !== memberToDelete),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { blogName, description, gitRepoUrl, blogMember } = formData;

    if (!blogName || !description || gitRepoUrl === "pick one from your Github account") {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const updatedBlogData = await putBlogBlogId(blogId, blogName, description, gitRepoUrl, blogMember);
      navigate(`/blog/${blogId}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <div>Loading GitHub Repositories...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <NavBar onLogout={handleLogout} />
      <Container>
        <FormContainer>
          <Title>Edit your tech blog</Title>
          <Subtitle>
            A little note: Anyone on the Internet can see this tech blog. <br />
            Please fill out all fields marked with an asterisk (*).
          </Subtitle>

          <Form onSubmit={handleSubmit}>
            <FormField label="Blog name" required>
              <Input type="text" name="blogName" value={formData.blogName} onChange={handleChange} required />
            </FormField>

            <FormField label="Description" required>
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="You can write up to 4000 bytes."
                required
              />
            </FormField>

            <FormField label="Github repository link | This field cannot be edited." required>
              <Dropdown
                selectedValue={formData.gitRepoUrl}
                setSelectedValue={handleGitRepoSelection}
                items={githubRepos}
                disabled
              />
            </FormField>

            <FormSemiContainer>
              <FormField label="Additional contributors' Github Id" required>
                <Input
                  type="text"
                  name="blogMember"
                  value={newMember}
                  onChange={handleMemberChange}
                  placeholder="Enter the exact GitHub ID of the contributors one by one."
                />
              </FormField>
              <AddButton type="button" onClick={handleAddContributor}>
                + Add
              </AddButton>
            </FormSemiContainer>

            <ContributorsList>
              {formData.blogMember.length > 0 && (
                <div>
                  {formData.blogMember.map((member, index) => (
                    <MemberList>
                      <MemberItem key={index}>{member}</MemberItem>
                      <DeleteMember onClick={() => handleDeleteMember(member)}>X</DeleteMember>
                    </MemberList>
                  ))}
                </div>
              )}
            </ContributorsList>
            <ButtonContainer>
              <GoToButton text="Edit Blog" type="submit" />
            </ButtonContainer>
          </Form>
        </FormContainer>
      </Container>
      <Footer />
    </>
  );
}

export default EditBlogPage;

// Styled components
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

const FormSemiContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AddButton = styled.button`
  width: 100px;
  height: 67px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  font-size: 20px;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.05);
  margin-bottom: 10px;
`;

const ContributorsList = styled.div`
  color: #ffffff;
  margin-top: 0;

  div {
    display: flex;
    flex-direction: row;
    margin-right: 10px;
  }
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  width: 200px;
  height: 47px;
  padding-top: 3.5px;
  text-align: center;
  justify-content: center;
`;

const MemberItem = styled.div`
  margin-right: 10px;
  font-size: 25px;
`;

const DeleteMember = styled.span`
  margin-left: 10px;
  font-size: 20px;
  padding-top: 5px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
`;

const StyledText = styled.div`
  color: rgba(255, 255, 255, 0.6);
`;

/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import NavBar from "../../components/NavbarItems/NavBar";
import GoToButton from "../../components/GoToButton";
import FormField from "../../components/Workspace/FormField";
import Input from "../../components/Workspace/Input";
import TextArea from "../../components/Workspace/TextArea";
import Dropdown from "../../components/Workspace/Dropdown";
import { useAuth } from "../../context/AuthContext";
import getRepos from "../../APIs/get/getRepos";
import getAuthInfo from "../../APIs/get/getAuthInfo";
import postBlog from "../../APIs/post/postBlog";
import getCheckUser from "../../APIs/get/getCheckUser";

function MakeBlogPage() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [formData, setFormData] = useState({
    blogName: "",
    description: "",
    gitRepoUrl: "pick one from your Github account",
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
        await fetchRepos();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isLoggedIn, navigate]);

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
    setNewMember(value);
  };

  const handleAddContributor = async () => {
    if (newMember.trim() === "") return; // 빈 값은 추가하지 않음

    try {
      const checkUserResponse = await getCheckUser(newMember.trim());

      if (checkUserResponse.isexists) {
        setFormData((prev) => ({
          ...prev,
          blogMember: [...prev.blogMember, newMember.trim()],
        }));
        setNewMember(""); // 입력란 비우기
      } else {
        alert("No GitHub user found with this ID.");
      }
    } catch (error) {
      console.error("Error checking GitHub user:", error);
      alert("There was an error checking the GitHub user.");
    }
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

    const blogData = {
      blogName,
      description,
      gitRepoUrl,
      blogMember,
    };

    try {

      const response = await postBlog(
        blogData.blogName,
        blogData.description,
        blogData.gitRepoUrl,
        blogData.blogMember
      );

      console.log("Blog created successfully:", response);

      navigate(`/blog/${response.blog_id}`);
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
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="You can write up to 4000 bytes."
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
              <GoToButton text="Create Blog" type="submit" />
            </ButtonContainer>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
}

export default MakeBlogPage;

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
  gap: 2vh;
`;

const AddButton = styled.button`
  width: 100px;
  height: 67px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  font-size: 20px;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.05);
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
  padding: 1vh;
  justify-content: space-between;
  align-items: center;
`;

const MemberItem = styled.div`
  text-align: left;
  font-size: 2.5vh;
`;

const DeleteMember = styled.span`
  margin-left: 10px;
  font-size: 20px;
  padding-top: 5px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
`;

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams 추가
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import GoToButton from "../../components/GoToButton";
import FormField from "../../components/Workspace/FormField";
import Dropdown from "../../components/Breakthrough/Dropdown";
import { useAuth } from "../../context/AuthContext";
import MarkdownEditor from "../../components/WritePageItem/MarkdownEditor ";
import getIssuesAndCommitsTitle from "../../APIs/get/getIssuseAndCommitsTitle";
import postArticle from "../../APIs/post/postArticle";
import getBlogBlogId from "../../APIs/get/getBlogBlogId";

// function WritePage() {
//   // const { isLoggedIn, user } = useAuth(); 
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();
//   const { blogId } = useParams(); // blogId 받아오기


//   const [isLoading, setIsLoading] = useState(false);
//   const [issuesAndCommits, setIssuesAndCommits] = useState([]);
//   const [error, setError] = useState(null);
//   const [gitRepoUrl, setGitRepoUrl] = useState(null);

//   // 로그인 체크 (세션 스토리지에서 토큰 확인)
//   useEffect(() => {
//     const token = sessionStorage.getItem("authToken");
//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchBlogData = async () => {
//       if (!isLoggedIn) {
//         navigate("/login");
//         return;
//       }

//       setIsLoading(true);
//       setError(null);

//       try {
//         // 블로그 ID로 블로그 정보 가져오기
//         const blogData = await getBlogBlogId(blogId);
//         const { git_repo_url } = blogData; // git_repo_url 추출
//         setGitRepoUrl(git_repo_url); // 상태에 저장

//         // git_repo_url을 이용해 이슈 및 커밋 제목 가져오기
//         const issuesData = await getIssuesAndCommitsTitle(git_repo_url);
//         setIssuesAndCommits(issuesData); // 이슈 및 커밋 제목 상태에 저장
//       } catch (error) {
//         setError("Failed to fetch issues and commits");
//         console.error(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (blogId && isLoggedIn) {
//       fetchBlogData(); // 블로그 ID가 존재하고 로그인된 경우에만 데이터 fetch
//     }
//   }, [isLoggedIn, blogId, navigate]);




//   // useEffect(() => {
//   //   if (!isLoggedIn) {
//   //     navigate("/login");
//   //   }
//   // }, [isLoggedIn, navigate]);

//   // if (!isLoggedIn) return null; 

//   // const [formData, setFormData] = useState({
//   //   title: "",
//   //   content: "",
//   // });

//   // const [selectedAbout, setSelectedAbout] = useState(""); 
//   // const [selectedProblem, setSelectedProblem] = useState("");
//   // const [selectedSolution, setSelectedSolution] = useState("");

//   // const [issuesAndCommits, setIssuesAndCommits] = useState([]); 

//   // const [isLoading, setIsLoading] = useState(false);
//   // const [error, setError] = useState(null);

//   // useEffect(() => {
//   //   const fetchIssuesAndCommits = async () => {
//   //     if (!isLoggedIn) {
//   //       navigate('/login');
//   //       return;
//   //     }
//   //     setIsLoading(true);
//   //     setError(null);

//   //     try {
//   //       // user 객체에서 git_repo_url를 받아오도록 수정
//   //       const data = await getIssuesAndCommitsTitle(html_url);
//   //       setIssuesAndCommits(data);
//   //     } catch (error) {
//   //       setError("Failed to fetch issues and commits");
//   //       console.error(error);
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   };

//   //   fetchIssuesAndCommits();
//   // }, [isLoggedIn, navigate, html_url]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { title, content } = formData;

//     if (!title || !content || !selectedAbout || !selectedProblem || !selectedSolution) {
//       setError("Please fill in all required fields");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await postArticle(
//         blogId, // blogId 사용
//         title,
//         content,
//         selectedAbout,
//         selectedProblem,
//         selectedSolution
//       );

//       console.log("Article posted successfully:", response);
//       navigate(`/blog/${blogId}`); // 블로그 페이지로 이동
//     } catch (err) {
//       console.error("Failed to post article:", err);
//       setError("Failed to post article. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <NavBar isLoggedIn={isLoggedIn} />
//       <Container>
//         <FormContainer>
//           <Form>
//             <FormField label="Breakthrough Title" required>
//               <Input 
//                 type="text" 
//                 name="title" 
//                 value={formData.title} 
//                 onChange={handleChange} 
//                 required 
//               />
//             </FormField>

//             <FormField label="Add related issue or commit (optional)">
//               <FormItem>
//                 <Label>Language</Label>
//                 <Dropdown
//                   label="language"
//                   selectedValue={selectedAbout}
//                   setSelectedValue={setSelectedAbout}
//                   items={issuesAndCommits}
//                 />
//               </FormItem>
//               <FormItem>
//                 <Label>Problem</Label>
//                 <Dropdown
//                   label="Problem"
//                   selectedValue={selectedProblem}
//                   setSelectedValue={setSelectedProblem}
//                   items={issuesAndCommits}
//                 />
//               </FormItem>
//               <FormItem>
//                 <Label>Solution</Label>
//                 <Dropdown
//                   label="Solution"
//                   selectedValue={selectedSolution}
//                   setSelectedValue={setSelectedSolution}
//                   items={issuesAndCommits}
//                 />
//               </FormItem>
//             </FormField>

//             <FormField label="Body" required>
//               <MarkdownEditor
//                 content={formData.content}
//                 setContent={(value) => setFormData((prev) => ({ ...prev, content: value }))}
//               />
//             </FormField>

//             <ButtonContainer>
//               <GoToButton 
//                 type="submit" 
//                 text="Post"
//                 onClick={handleSubmit}
//                 disabled={isLoading}
//               />
//               {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
//             </ButtonContainer>
//           </Form>
//         </FormContainer>
//       </Container>
//     </>
//   );
// }

// export default WritePage;







function WritePage() {
  const { blogId } = useParams(); // blogId 받아오기
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [selectedAbout, setSelectedAbout] = useState(""); 
  const [selectedProblem, setSelectedProblem] = useState("");
  const [selectedSolution, setSelectedSolution] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [issuesAndCommits, setIssuesAndCommits] = useState([]);
  const [error, setError] = useState(null);
  const [gitRepoUrl, setGitRepoUrl] = useState(null);

  // 로그인 체크 (세션 스토리지에서 토큰 확인)
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // 블로그 ID로 블로그 정보 가져오기
        const blogData = await getBlogBlogId(blogId);
        const { git_repo_url } = blogData; // git_repo_url 추출
        setGitRepoUrl(git_repo_url); // 상태에 저장

        // git_repo_url을 이용해 이슈 및 커밋 제목 가져오기
        const issuesData = await getIssuesAndCommitsTitle(gitRepoUrl);
        setIssuesAndCommits(issuesData); // 이슈 및 커밋 제목 상태에 저장
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

    if (!title || !content || !selectedAbout || !selectedProblem || !selectedSolution) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError(null);

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
                <Dropdown
                  label="language"
                  selectedValue={selectedAbout}
                  setSelectedValue={setSelectedAbout}
                  items={issuesAndCommits}
                />
              </FormItem>
              <FormItem>
                <Label>Problem</Label>
                <Dropdown
                  label="Problem"
                  selectedValue={selectedProblem}
                  setSelectedValue={setSelectedProblem}
                  items={issuesAndCommits}
                />
              </FormItem>
              <FormItem>
                <Label>Solution</Label>
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
              <GoToButton 
                type="submit" 
                text="Post"
                onClick={handleSubmit}
                disabled={isLoading}
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
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
  
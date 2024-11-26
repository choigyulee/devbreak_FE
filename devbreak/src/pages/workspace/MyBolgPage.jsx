// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "@emotion/styled";
// import NavBar from "../../components/NavBar";
// import { BsStarFill, BsPencil, BsGithub } from "react-icons/bs";
// import GoToButton from "../../components/GoToButton";
// import List from "../../components/Breakthrough/List";
// import PropTypes from "prop-types";
// import { useAuth } from "../../AuthContext";

// const ActivityItem = ({ activity }) => {
//   // state가 "open" 또는 null일 경우 초록색, 아니면 보라색
//   const dotColor = activity.state === "open" || activity.state === null ? "#4ADE80" : "#8250DF";

//   return (
//     <ActivityItemContainer>
//       <ActivityDot style={{ backgroundColor: dotColor }} />
//       <ActivityContent>
//         <ActivityMessage>{activity.message}</ActivityMessage>
//         <ActivityDate>{activity.updatedAt}</ActivityDate>
//       </ActivityContent>
//     </ActivityItemContainer>
//   );
// };

// ActivityItem.propTypes = {
//   activity: PropTypes.shape({
//     state: PropTypes.string,
//     message: PropTypes.string.isRequired,
//     updatedAt: PropTypes.string.isRequired,
//   }).isRequired,
// };

// const MemberItem = ({ member }) => <Member>{member}</Member>;

// MemberItem.propTypes = {
//   member: PropTypes.string.isRequired,
// };

// function MyBolgPage() {
//   const { isLoggedIn } = useAuth();
//   const navigate = useNavigate();

//   // 고정된 목 데이터를 설정
//   const [blogData] = useState({
//     blogName: "devbreak BE tech blog",
//     description: "This is a blog about my journey through learning web development.",
//     gitRepoUrl: "https://github.com/LikeLion-Project-3Team/BE",
//     members: ["sadew1121", "ddfsdf545", "dfeeg5445"],
//     breakthroughs: [
//       { title: "First Breakthrough", description: "Started learning React!" },
//       { title: "Second Breakthrough", description: "Built my first app!" },
//     ],
//     repositoryActivity: [
//       { message: "Pushed new changes to the repository.", date: "2024.11.01" },
//       { message: "Opened a new issue regarding bug fixes.", date: "2024.11.02" },
//     ],
//     favButton: false,
//   });

//   const [favButton, setFavButton] = useState(blogData.favButton); // 초기값은 blogData에서 가져옴

//   // 좋아요 버튼 클릭 핸들러
//   const handleFavButtonClick = () => {
//     setFavButton(!favButton); // 색상 변경 토글
//   };

//   // GitHub 아이콘 클릭 핸들러
//   const handleGitHubClick = () => {
//     window.open(blogData.gitRepoUrl, "_blank");
//   };

//   // 연필 아이콘 클릭 핸들러
//   const handlePencilClick = () => {
//     navigate("/workspace/myblog/write");
//   };

//   return (
//     <>
//       <NavBar isLoggedIn={isLoggedIn} />
//       <Container>
//         <InfoContainer>
//           <BlogInfo>
//             <NameContainer>
//               <BlogName>{blogData.blogName}</BlogName>
//               <StarButton
//                 onClick={handleFavButtonClick}
//                 style={{
//                   color: favButton ? "#FFEC4C" : "white",
//                 }}
//               >
//                 <BsStarFill size={30} />
//               </StarButton>
//               {/* <FollowText>
//                 If you want to watch more breakthroughs of this blog, follow this!
//               </FollowText> */}
//             </NameContainer>
//             <DescriptionContainer>
//               <BlogDescription>
//                 {blogData.description}
//                 <IconContainer onClick={handleGitHubClick}>
//                   <BsGithub size={24} />
//                 </IconContainer>
//                 <IconContainer onClick={handlePencilClick}>
//                   <BsPencil size={24} />
//                 </IconContainer>
//               </BlogDescription>
//             </DescriptionContainer>
//           </BlogInfo>

//           <ContentContainer>
//             <LeftColumn>
//               <Section>
//                 <SectionTitle>Project Repository Activity</SectionTitle>
//                 <ActivityContainer>
//                   {blogData.repositoryActivity.map((activity, index) => (
//                     <ActivityItem key={index} activity={activity} />
//                   ))}
//                 </ActivityContainer>
//               </Section>

//               <Section>
//                 <SectionTitle>Project Members</SectionTitle>
//                 <MembersContainer>
//                   {blogData.members.map((member, index) => (
//                     <MemberItem key={index} member={member} />
//                   ))}
//                 </MembersContainer>
//               </Section>
//             </LeftColumn>

//             <RightColumn>
//               <TitleContainer>
//                 <SectionTitle>The Breakthroughs ({blogData.breakthroughs.length})</SectionTitle>
//                 {blogData.breakthroughs.length > 0 && (
//                   <GoToButton
//                     onClick={() => navigate("/workspace/myblog/write")}
//                     fontSize="20px"
//                     text="Write"
//                     width="100px"
//                     height="40px"
//                     style={{
//                       position: "absolute",
//                       right: "0",
//                       top: "0",
//                     }}
//                   />
//                 )}
//               </TitleContainer>
//               <ListContainer>
//                 {blogData.breakthroughs.length === 0 ? (
//                   <EmptyState>
//                     <p>
//                       Share your <br /> breakthroughs with us!
//                     </p>
//                     <GoToButton
//                       onClick={() => navigate("/workspace/myblog/write")}
//                       fontSize="20px"
//                       text="Post my own breakthroughs"
//                       width="380px"
//                       height="40px"
//                       style={{
//                         position: "absolute",
//                         right: "0",
//                         bottom: "20px",
//                       }}
//                     />
//                   </EmptyState>
//                 ) : (
//                   <List maxWidth={500} items={blogData.breakthroughs} currentPage={1} itemsPerPage={15} />
//                 )}
//               </ListContainer>
//             </RightColumn>
//           </ContentContainer>
//         </InfoContainer>
//       </Container>
//     </>
//   );
// }

// MyBolgPage.propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired, // isLoggedIn prop validation 추가
// };

// export default MyBolgPage;

// const Container = styled.div`
//   margin-bottom: 300px;
//   font-family: "Urbanist";
//   color: #ffffff;
// `;

// const InfoContainer = styled.div`
//   margin: 60px auto;
//   width: 75vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   width: 930px;
// `;

// const BlogInfo = styled.div`
//   margin-bottom: 40px;
// `;

// const NameContainer = styled.div`
//   display: flex;
//   align-items: baseline;
//   gap: 16px;
//   margin-bottom: 20px;
// `;

// const BlogName = styled.div`
//   font-size: 35px;
//   font-weight: bold;
//   margin: 0;
// `;

// const StarButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 0;
//   opacity: 0.9;
// `;

// // const FollowText = styled.span`
// //   font-size: 20px;
// //   margin-left: 0;
// //   opacity: 0.8;
// // `;

// const DescriptionContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   word-wrap: break-word;
//   white-space: normal;
//   word-break: break-word;
// `;

// const BlogDescription = styled.div`
//   font-size: 25px;
//   max-width: 60vw;
//   display: flex;
//   flex-direction: row;
//   justify-content: baseline;
//   align-items: baseline;
// `;

// const IconContainer = styled.div`
//   margin-left: 15px;
//   cursor: pointer;
// `;

// const ContentContainer = styled.div`
//   display: flex;
//   gap: 40px;
// `;

// const LeftColumn = styled.div`
//   flex: 1;
//   margin-right: 50px;
// `;

// const RightColumn = styled.div`
//   flex: 1;
//   position: relative;
// `;

// const Section = styled.div`
//   margin-bottom: 30px;
// `;

// const SectionTitle = styled.div`
//   font-family: "Pretendard";
//   font-size: 25px;
//   margin-bottom: 20px;
// `;

// const ActivityContainer = styled.div`
//   background-color: rgba(255, 255, 255, 0.1);
//   border: 1px solid rgba(255, 255, 255, 0.7);
//   border-radius: 8px;
//   padding: 20px;
//   max-height: 400px;
//   overflow-y: auto;
// `;

// const ActivityItemContainer = styled.div`
//   display: flex;
//   align-items: flex-start;
//   margin-bottom: 15px;
//   gap: 10px;
// `;

// const ActivityDot = styled.div`
//   width: 8px;
//   height: 8px;
//   border-radius: 50%;
//   margin-top: 6px;
// `;

// const ActivityContent = styled.div`
//   flex: 1;
// `;

// const ActivityMessage = styled.div`
//   font-size: 20px;
//   margin-bottom: 4px;
// `;

// const ActivityDate = styled.div`
//   font-size: 20px;
//   color: #888;
// `;

// const MembersContainer = styled.div`
//   background-color: rgba(255, 255, 255, 0.1);
//   border: 1px solid rgba(255, 255, 255, 0.7);
//   border-radius: 8px;
//   padding: 20px;
// `;

// const Member = styled.div`
//   margin-bottom: 10px;
//   font-size: 20px;
// `;

// const TitleContainer = styled.div`
//   width: 518px;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: flex-start;
// `;

// const ListContainer = styled.div`
//   width: 530px;
//   position: relative;
// `;

// const EmptyState = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   width: 83%;
//   min-height: 560px;
//   background-color: rgba(255, 255, 255, 0.1);
//   border: 1px solid rgba(255, 255, 255, 0.7);
//   border-radius: 8px;
//   color: #888;
//   p {
//     font-family: "Pretendard";
//     font-size: 30px;
//     color: #ffffff;
//     margin-bottom: 20px;
//   }
// `;


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import { BsStarFill, BsPencil, BsGithub } from "react-icons/bs";
import GoToButton from "../../components/GoToButton";
import List from "../../components/Breakthrough/List";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import getBlogBlogId from "../../APIs/get/getBlogBlogId";
import getIssuesAndCommits from "../../APIs/get/getIssuesAndCommits";

  // 이슈와 커밋을 표시하는 컴포넌트
  const ActivityItem = ({ activity }) => {
    const dotColor = activity.type === "Issue" ? "#FF4C4C" : "#4ADE80"; // 이슈는 빨간색, 커밋은 초록색

    return (
      <ActivityItemContainer>
        <ActivityDot style={{ backgroundColor: dotColor }} />
        <ActivityContent>
          <ActivityMessage>{activity.title}</ActivityMessage>
        </ActivityContent>
      </ActivityItemContainer>
    );
  };

  const MemberItem = ({ member }) => <Member>{member}</Member>;

function MyBolgPage () {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [blogData, setBlogData] = useState(null); // 블로그 데이터 상태
  const [issuesAndCommits, setIssuesAndCommits] = useState([]); // 이슈 및 커밋 데이터 상태
  const [favButton, setFavButton] = useState(false);
  // 블로그 데이터 가져오기
  const fetchBlogData = async (blogId) => {
    try {
      const data = await getBlogBlogId(blogId); // 블로그 ID를 이용한 API 호출
      setBlogData(data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  // 이슈 및 커밋 데이터 가져오기
  const fetchIssuesAndCommits = async (gitRepoUrl) => {
    try {
      const data = await getIssuesAndCommits(gitRepoUrl); // 이슈 및 커밋 데이터 API 호출
      setIssuesAndCommits(data);
    } catch (error) {
      console.error("Error fetching issues and commits:", error);
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchBlogData(blogId);
    }
  }, [blogId]);
  
  useEffect(() => {
    if (blogData?.gitRepoUrl) {
      fetchIssuesAndCommits(blogData.gitRepoUrl);
    }
  }, [blogData?.gitRepoUrl]);


  if (!blogData) {
    return <div>Loading...</div>; // 블로그 데이터가 로딩 중이면 "Loading..." 표시
  }

  useEffect(() => {
    if (blogData) {
      setFavButton(blogData.favButton || false);
    }
  }, [blogData]);
  
  // 좋아요 버튼 클릭 핸들러
  const handleFavButtonClick = () => {
    setFavButton(!favButton); // 색상 변경 토글
  };

  // GitHub 아이콘 클릭 핸들러
  const handleGitHubClick = () => {
    window.open(blogData.gitRepoUrl, "_blank");
  };

  // 연필 아이콘 클릭 핸들러
  const handlePencilClick = () => {
    navigate("/workspace/myblog/write");
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <InfoContainer>
          <BlogInfo>
            <NameContainer>
              <BlogName>{blogData.blogName}</BlogName>
              <StarButton
                onClick={handleFavButtonClick}
                style={{
                  color: favButton ? "#FFEC4C" : "white",
                }}
              >
                <BsStarFill size={30} />
              </StarButton>
              {/* <FollowText>
                If you want to watch more breakthroughs of this blog, follow this!
              </FollowText> */}
            </NameContainer>
            <DescriptionContainer>
              <BlogDescription>
                {blogData.description}
                <IconContainer onClick={handleGitHubClick}>
                  <BsGithub size={24} />
                </IconContainer>
                <IconContainer onClick={handlePencilClick}>
                  <BsPencil size={24} />
                </IconContainer>
              </BlogDescription>
            </DescriptionContainer>
          </BlogInfo>

          <ContentContainer>
            <LeftColumn>
              <Section>
                <SectionTitle>Project Repository Activity</SectionTitle>
                {/* <ActivityContainer>
                  {blogData.repositoryActivity.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} />
                  ))}
                </ActivityContainer> */}
                <ActivityContainer>
                  {issuesAndCommits.length === 0 ? (
                    <p>No issues or commits found.</p>
                  ) : (
                    issuesAndCommits.map((activity, index) => (
                      <ActivityItem key={index} activity={activity} />
                    ))
                  )}
                </ActivityContainer>
              </Section>

              <Section>
                <SectionTitle>Project Members</SectionTitle>
                <MembersContainer>
                  {blogData.members.map((member, index) => (
                    <MemberItem key={index} member={member} />
                  ))}
                </MembersContainer>
              </Section>
            </LeftColumn>

            <RightColumn>
              <TitleContainer>
                <SectionTitle>The Breakthroughs ({blogData.breakthroughs.length})</SectionTitle>
                {blogData.breakthroughs.length > 0 && (
                  <GoToButton
                    onClick={() => navigate("/workspace/myblog/write")}
                    fontSize="20px"
                    text="Write"
                    width="100px"
                    height="40px"
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "0",
                    }}
                  />
                )}
              </TitleContainer>
              <ListContainer>
                {blogData.breakthroughs.length === 0 ? (
                  <EmptyState>
                    <p>
                      Share your <br /> breakthroughs with us!
                    </p>
                    <GoToButton
                      onClick={() => navigate("/workspace/myblog/write")}
                      fontSize="20px"
                      text="Post my own breakthroughs"
                      width="380px"
                      height="40px"
                      style={{
                        position: "absolute",
                        right: "0",
                        bottom: "20px",
                      }}
                    />
                  </EmptyState>
                ) : (
                  <List maxWidth={500} items={blogData.breakthroughs} currentPage={1} itemsPerPage={15} />
                )}
              </ListContainer>
            </RightColumn>
          </ContentContainer>
        </InfoContainer>
      </Container>
    </>
  );
}

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

MemberItem.propTypes = {
  member: PropTypes.string.isRequired
};

export default MyBolgPage;

const Container = styled.div`
  margin-bottom: 300px;
  font-family: "Urbanist";
  color: #ffffff;
`;

const InfoContainer = styled.div`
  margin: 60px auto;
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 930px;
`;

const BlogInfo = styled.div`
  margin-bottom: 40px;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 20px;
`;

const BlogName = styled.div`
  font-size: 35px;
  font-weight: bold;
  margin: 0;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  opacity: 0.9;
`;

// const FollowText = styled.span`
//   font-size: 20px;
//   margin-left: 0;
//   opacity: 0.8;
// `;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  word-wrap: break-word;
  white-space: normal;
  word-break: break-word;
`;

const BlogDescription = styled.div`
  font-size: 25px;
  max-width: 60vw;
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: baseline;
`;

const IconContainer = styled.div`
  margin-left: 15px;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 40px;
`;

const LeftColumn = styled.div`
  flex: 1;
  margin-right: 50px;
`;

const RightColumn = styled.div`
  flex: 1;
  position: relative;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.div`
  font-family: "Pretendard";
  font-size: 25px;
  margin-bottom: 20px;
`;

const ActivityContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
`;

const ActivityItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  gap: 10px;
`;

const ActivityDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 6px;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityMessage = styled.div`
  font-size: 20px;
  margin-bottom: 4px;
`;

const ActivityDate = styled.div`
  font-size: 20px;
  color: #888;
`;

const MembersContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 20px;
`;

const Member = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
`;

const TitleContainer = styled.div`
  width: 518px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const ListContainer = styled.div`
  width: 530px;
  position: relative;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 83%;
  min-height: 560px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  color: #888;
  p {
    font-family: "Pretendard";
    font-size: 30px;
    color: #ffffff;
    margin-bottom: 20px;
  }
`;
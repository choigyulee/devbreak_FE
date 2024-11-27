import styled from "@emotion/styled";
import PropTypes from "prop-types";
import GoToButton from "../GoToButton";
import List from "../Breakthrough/List";
import ActivityItem from "../ContentsPageItems/ActivityItem";

function BlogContent({ blogData, isLoggedIn, blogId, navigate, currentUserId }) {
  // 사용자가 블로그의 멤버인지 확인
  const isMember = blogData.members.includes(currentUserId);

  return (
    <ContentContainer>
      <LeftColumn>
        <Section>
          <SectionTitle>Project Repository Activity</SectionTitle>
          <ActivityContainer>
            {blogData.repositoryActivity && blogData.repositoryActivity.length > 0 ? (
              blogData.repositoryActivity.map((data, index) => <ActivityItem key={index} activity={data} />)
            ) : (
              <NoActivityMessage>There is no Repository Activity!</NoActivityMessage>
            )}
          </ActivityContainer>
        </Section>
        <Section>
          <SectionTitle>Project Members</SectionTitle>
          <MembersContainer>
            {blogData.members.map((member, index) => (
              <Member key={index}>{member}</Member>
            ))}
          </MembersContainer>
        </Section>
      </LeftColumn>
      <RightColumn>
        <TitleContainer>
          <SectionTitle>The Breakthroughs ({blogData.break_throughs.length})</SectionTitle>
          {isLoggedIn && isMember && blogData.break_throughs.length > 0 && (
            <GoToButton
              onClick={() => navigate(`/blog/${blogId}/write`)}
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
          {isLoggedIn ? (
            isMember ? (
              blogData.break_throughs.length === 0 ? (
                <EmptyState>
                  <p>
                    Share your <br /> breakthroughs with us!
                  </p>
                  <GoToButton
                    onClick={() => navigate(`/blog/${blogId}/write`)}
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
                <List maxWidth={500} items={blogData.break_throughs} currentPage={1} itemsPerPage={15} />
              )
            ) : (
              <List maxWidth={500} items={blogData.break_throughs} currentPage={1} itemsPerPage={15} />
            )
          ) : blogData.break_throughs.length === 0 ? ( // 로그인하지 않은 상태에서 break_throughs가 0일 경우
            <EmptyState>
              <NoArticleMessage>There is no Breakthrough</NoArticleMessage>
            </EmptyState>
          ) : (
            <List maxWidth={500} items={blogData.break_throughs} currentPage={1} itemsPerPage={15} />
          )}
        </ListContainer>
      </RightColumn>
    </ContentContainer>
  );
}

BlogContent.propTypes = {
  blogData: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  blogId: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired,
};

export default BlogContent;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3vh;
`;
const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 40vh;
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
`;
const MembersContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  width: 40vh;
  padding: 20px;
`;
const Member = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
`;
const TitleContainer = styled.div`
  width: 50vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
const ListContainer = styled.div`
  width: 60vh;
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
const NoActivityMessage = styled.div`
  font-size: 2vh;
  color: #888;
`;
const NoArticleMessage = styled.div`
  font-size: 3.5vh;
  color: #888;
`;

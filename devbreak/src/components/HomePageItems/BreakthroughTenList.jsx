import styled from "@emotion/styled";
import PropTypes from "prop-types";
import BreakthroughBox from "./BreakthroughBox"; // BreakthroughBox 컴포넌트 임포트
import { useRef } from "react";

const BreakthroughTenList = ({ items }) => {
  const innerListRef = useRef(null);

  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    innerListRef.current.dataset.touchStartX = touchStartX;
  };

  const handleTouchMove = (e) => {
    const touchStartX = parseFloat(innerListRef.current.dataset.touchStartX);
    const touchCurrentX = e.touches[0].clientX;
    const touchDiff = touchStartX - touchCurrentX;

    innerListRef.current.scrollLeft += touchDiff;
    innerListRef.current.dataset.touchStartX = touchCurrentX; // 업데이트
  };

  return (
    <Container>
      <Title>
        Top 10 of Today’s <BoldText>Breakthroughs</BoldText>
      </Title>
      <ListContainer>
        <InnerListContainer ref={innerListRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
          {items.slice(0, 10).map((item) => (
            <BreakthroughBoxWrapper key={item.articleId}>
              <BreakthroughBox
                title={item.title} // title
                createdAt={item.createdAt} // createdAt
                blogName={item.blogName} // blogName
                articleId={item.articleId} // articleId
              />
            </BreakthroughBoxWrapper>
          ))}
        </InnerListContainer>
      </ListContainer>
    </Container>
  );
};

BreakthroughTenList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      articleId: PropTypes.number.isRequired, // articleId는 필수 숫자
      title: PropTypes.string.isRequired, // title은 필수 문자열
      blogName: PropTypes.string.isRequired, // blogName은 필수 문자열
      createdAt: PropTypes.string.isRequired, // createdAt은 필수 문자열
      likeCount: PropTypes.number.isRequired, // likeCount는 필수 숫자
    })
  ).isRequired, // items는 필수 배열
};

export default BreakthroughTenList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: -5vh 3vh 0vh 3vh;
  gap: 3vh;
`;

const ListContainer = styled.div`
  display: flex;
  overflow-x: hidden; /* 스크롤바 숨기기 */
  margin-right: -20px; /* 오른쪽으로만 마진을 넘기기 위해 음수 마진 설정 */
`;

const InnerListContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto; /* 내부 요소에 가로 스크롤 활성화 */
  gap: 2vh; /* 박스 간의 간격 */
  flex-wrap: nowrap; /* 줄 바꿈 방지 */

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  & {
    -ms-overflow-style: none; /* IE 및 Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const Title = styled.div`
  font-size: 3vh;
  font-weight: 400;
  font-family: "pretendard";
  color: white;
`;

const BoldText = styled.span`
  font-weight: 700;
  font-size: 3vh;
  font-family: "Pretendard"; // devbreak에 대한 font-weight 설정
`;

const BreakthroughBoxWrapper = styled.div`
  width: 20vw; /* 각 박스의 너비를 20vw로 설정 */
  flex-shrink: 0; /* 박스가 줄어들지 않도록 설정 */
  display: flex; /* Flexbox 사용 */
  align-items: stretch; /* 자식 요소의 높이를 동일하게 맞춤 */
`;

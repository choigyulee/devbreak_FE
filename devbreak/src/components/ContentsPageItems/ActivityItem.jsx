import styled from "@emotion/styled";
import PropTypes from "prop-types";

const ActivityItem = ({ language, problem, solution }) => {
  return (
    <ActivityContainer>
      <Language>
        About <p>{language}</p>
      </Language>
      <Problem>
        Problem <p>{problem}</p>
      </Problem>
      <Solution>
        Solution <p>{solution}</p>
      </Solution>
    </ActivityContainer>
  );
};

ActivityItem.propTypes = {
  language: PropTypes.string.isRequired, // 카테고리 이름
  problem: PropTypes.string.isRequired, // 문제 설명
  solution: PropTypes.string.isRequired, // 해결책 설명
};

export default ActivityItem;

const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  width: 30vw;
`;

const Language = styled.div`
  font-size: 3vh;
  font-family: "pretendard";
  font-weight: 400;
  color: #a7a7a7;
  line-height: 3.5vh;
  display: flex;
  flex-direction: row;
  gap: 2vh;
  p {
    font-size: 2.5vh;
    color: #ffffff;
  }
`;

const Problem = styled.div`
  font-size: 2.5vh;
  font-family: "pretendard";
  font-weight: 400;
  color: #a7a7a7;
  line-height: 3.5vh;
  display: flex;
  flex-direction: row;
  gap: 2vh;
  p {
    font-size: 2.5vh;
    color: #ffffff;
  }
`;

const Solution = styled.div`
  font-size: 2.5vh;
  font-family: "pretendard";
  font-weight: 400;
  color: #a7a7a7;
  line-height: 3.5vh;
  display: flex;
  flex-direction: row;
  gap: 2vh;
  p {
    font-size: 2.5vh;
    color: #ffffff;
  }
`;

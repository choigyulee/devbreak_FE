import styled from "@emotion/styled";
import PropTypes from "prop-types";

const ActivityItem = ({ language, problem, solution }) => {
  return (
    <ActivityContainer>
      {language && (
        <Language>
          Language <p>{language}</p>
        </Language>
      )}
      {problem && (
        <Problem>
          Problem <p>{problem}</p>
        </Problem>
      )}
      {solution && (
        <Solution>
          Solution <p>{solution}</p>
        </Solution>
      )}
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
  align-items: baseline;
`;

const Language = styled.div`
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

const Problem = styled.div`
  font-size: 2.5vh;
  font-family: "pretendard";
  font-weight: 400;
  color: #a7a7a7;
  line-height: 3.5vh;
  display: flex;
  flex-direction: row;
  gap: 4vh;
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
  gap: 4vh;
  p {
    font-size: 2.5vh;
    color: #ffffff;
  }
`;

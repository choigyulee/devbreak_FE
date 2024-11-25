import styled from "@emotion/styled";
import PropTypes from "prop-types";

const CopywritingBoxItem = ({ title, contents, rotate }) => {
  return (
    <ItemBox rotate={rotate}>
      <Title>{title}</Title>
      <Contents>{contents}</Contents>
    </ItemBox>
  );
};

CopywritingBoxItem.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  rotate: PropTypes.number.isRequired, // 회전 각도 prop 추가
};

export default CopywritingBoxItem;

const ItemBox = styled.div`
  color: black;
  padding: 5vh 4vh;
  box-sizing: border-box;
  background: rgba(141, 255, 211, 0.3);
  border: 1px solid #181c22;
  backdrop-filter: blur(40px);
  border-radius: 2vh;
  width: 28vh; /* 원하는 width 값 */
  transition: background 0.3s, border 0.3s, box-shadow 0.3s, transform 0.3s, z-index 0.3s; /* 애니메이션 효과 추가 */

  /* 회전 효과 */
  transform: rotate(${(props) => props.rotate}deg);

  /* margin을 사용하여 겹치게 설정 */
  margin: 0vh -1.5vh; /* 요소 간의 간격을 줄여서 겹치도록 설정 */

  :hover {
    background: #8dffd3;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 20px #02f798;
    backdrop-filter: blur(40px);
    z-index: 10; /* hover 시 z-index를 높여서 가장 앞에 위치하도록 설정 */
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 2.5vh;
`;

const Contents = styled.div`
  margin-top: 1vh;
  font-size: 2vh;
`;

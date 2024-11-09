import styled from "@emotion/styled";
import PropTypes from "prop-types"; // prop-types 임포트

const GoToButton = ({ text, onClick, width = "280px", height = "58px", borderRadius = "63px" }) => {
  return (
    <Button onClick={onClick} width={width} height={height} borderRadius={borderRadius}>
      {text}
    </Button>
  );
};

GoToButton.propTypes = {
  text: PropTypes.string.isRequired, // text는 필수 문자열
  onClick: PropTypes.func.isRequired, // onClick은 필수 함수
};

export default GoToButton;

const Button = styled.button`
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px);
  width: ${({ width }) => width}; /* width prop 사용 */
  height: ${({ height }) => height}; /* height prop 사용 */
  color: #ffffff;
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 22px;
  border-radius: ${({ borderRadius }) => borderRadius}; /* borderRadius prop 사용 */
  cursor: pointer;
  transition: color, border 0.3s;

  &:hover {
    color: #02f798;
    border: 3px solid #02f798;
    box-shadow: 0px 0px 10px rgba(2, 247, 152, 0.25);
  }
`
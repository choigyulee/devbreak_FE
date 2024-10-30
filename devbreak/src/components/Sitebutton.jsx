// SiteButton.js
import styled from "@emotion/styled";
import PropTypes from "prop-types"; // prop-types 임포트

const Button = styled.button`
  padding: 20px 30px;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px);
  border-radius: 18px;
  width: 20vw;
  color: #ffffff;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 15px;
  border-radius: 30px;
  cursor: pointer;
  transition: color, border 0.3s;

  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 10px rgba(2, 247, 152, 0.25);
  }
`;

const SiteButton = ({ text, onClick }) => {
  return <Button onClick={onClick}>{text}</Button>;
};

// props validation 추가
SiteButton.propTypes = {
  text: PropTypes.string.isRequired, // text는 필수 문자열
  onClick: PropTypes.func.isRequired, // onClick은 필수 함수
};

export default SiteButton;

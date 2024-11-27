// components/Input.js
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Input = ({ type, name, value, onChange, required }) => (
  <StyledInput type={type} name={name} value={value} onChange={onChange} required={required} />
);

const StyledInput = styled.input`
  width: 100%;
  height: 67px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  font-size: 20px;
  color: #ffffff;
  padding: 30px;
  margin-left: 0px;
  margin-top: 10px;

  &:focus {
    outline: none;
  }
`;

Input.propTypes = {
  type: PropTypes.string.isRequired, // type은 필수 문자열
  name: PropTypes.string.isRequired, // name은 필수 문자열
  value: PropTypes.string.isRequired, // value는 필수 문자열
  onChange: PropTypes.func.isRequired, // onChange는 필수 함수
  required: PropTypes.bool, // required는 선택적 불리언
};

// 기본값 설정 (선택적)
Input.defaultProps = {
  required: false, // required의 기본값은 false
};

export default Input;

import styled from "@emotion/styled";
import PropTypes from "prop-types";

const TextArea = ({ name, value, onChange, required }) => (
  <TextAreaContainer name={name} value={value} onChange={onChange} required={required} />
);

const TextAreaContainer = styled.textarea`
  width: 100%;
  min-height: 190px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  font-size: 20px;
  color: #ffffff;
  padding: 30px;
  margin-left: 0;
  margin-top: 10px;
  resize: vertical;

  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    outline: none;
  }
`;

TextArea.propTypes = {
  name: PropTypes.string.isRequired, // name은 필수 문자열
  value: PropTypes.string.isRequired, // value는 필수 문자열
  onChange: PropTypes.func.isRequired, // onChange는 필수 함수
  required: PropTypes.bool, // required는 선택적 불리언
};

// 기본값 설정 (선택적)
TextArea.defaultProps = {
  required: false, // required의 기본값은 false
};

export default TextArea;

// components/FormField.js
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const FormField = ({ label, required, children }) => {
  return (
    <FormFieldContainer>
      <Label>
        {label}
        {required && <Required>*</Required>}
      </Label>
      {children}
    </FormFieldContainer>
  );
};

const FormFieldContainer = styled.div`
  margin-bottom: 48px;
`;

const Label = styled.label`
  font-size: 25px;
  font-weight: 500;
  margin-left: 0px;
`;

const Required = styled.span`
  color: #ff0000;
  font-size: 25px;
  font-weight: 500;
`;

FormField.propTypes = {
  label: PropTypes.string.isRequired, // label은 필수 문자열
  required: PropTypes.bool, // required는 선택적 불리언
  children: PropTypes.node.isRequired, // children은 필수 노드
};

// 기본값 설정 (선택적)
FormField.defaultProps = {
  required: false, // required의 기본값은 false
};

export default FormField;

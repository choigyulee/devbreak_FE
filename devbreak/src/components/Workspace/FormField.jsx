// components/FormField.js
import React from 'react';
import styled from "@emotion/styled";

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
  color: #FF0000;
  font-size: 25px;
  font-weight: 500;
`;

export default FormField;

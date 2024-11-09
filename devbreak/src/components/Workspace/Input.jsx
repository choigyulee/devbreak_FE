// components/Input.js
import React from 'react';
import styled from "@emotion/styled";

const Input = ({ type, name, value, onChange, required }) => (
  <StyledInput
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    required={required}
  />
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

export default Input;

import React from 'react';
import styled from "@emotion/styled";

const TextArea = ({ name, value, onChange, required }) => (
  <TextAreaContainer
    name={name}
    value={value}
    onChange={onChange}
    required={required}
  />
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

export default TextArea;

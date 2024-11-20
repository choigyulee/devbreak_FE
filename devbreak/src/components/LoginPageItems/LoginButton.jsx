// src/components/LoginButton.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil'; // 리코일 상태를 변경하기 위한 훅
import { authState } from '../../atoms/authAtoms'; // authState atom을 가져오기

const LoginButton = () => {
  const [auth, setAuth] = useRecoilState(authState); // 로그인 상태를 가져오고 변경하는 훅

  const handleLogin = () => {
    setAuth({ isLoggedIn: true }); // 로그인 상태로 변경
  };

  return (
    <ButtonContainer onClick={handleLogin}>
      <Link to="/login">Login</Link>
    </ButtonContainer>
  );
};

export default LoginButton;

const ButtonContainer = styled.button`
  font-weight: 700;
  padding: 0.5vw 1vw;
  margin-left: 13vw;
  color: white;
  font-size: 1.3vw;
  border-radius: 3vw;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px);
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;

  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 10px rgba(2, 247, 152, 0.25);
  }
`;

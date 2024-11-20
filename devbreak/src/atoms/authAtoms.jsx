// src/atoms/authAtoms.js
import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',  // 고유한 key
  default: {
    isLoggedIn: false, // 초기값은 로그인 안 된 상태
    accessToken: null,
    refreshToken: null,
  },
});


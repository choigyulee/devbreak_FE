import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,  // 로그인 여부
  userName: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userName = action.payload.userName;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userName = '';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

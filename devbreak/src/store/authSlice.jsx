import { createSlice } from '@reduxjs/toolkit';

const loadAuthFromStorage = () => {
  const storedAuth = sessionStorage.getItem('auth');
  return storedAuth ? JSON.parse(storedAuth) : { isLoggedIn: false, userName: '' };
};

// const initialState = {
//   isLoggedIn: false,  // 로그인 여부
//   userName: '',
// };
const initialState = loadAuthFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userName = action.payload.userName;
      sessionStorage.setItem('auth', JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userName = '';
      sessionStorage.removeItem('auth');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

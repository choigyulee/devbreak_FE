import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : { likedArticles: {}, favoriteBlogs: {} };
};

// const initialState = {
//   likedArticles: {},
//   favoriteBlogs: {},
// };
const initialState = loadUserFromStorage();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLiked: (state, action) => {
      const { articleId, liked } = action.payload;
      state.likedArticles[articleId] = liked;
      localStorage.setItem('user', JSON.stringify(state));
    },
    setFavButton: (state, action) => {
      const { blogId, favButton } = action.payload;
      state.favoriteBlogs[blogId] = favButton;
      localStorage.setItem('user', JSON.stringify(state));
    },
  },
});

export const { setLiked, setFavButton } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedArticles: {},
  favoriteBlogs: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLiked: (state, action) => {
      const { articleId, liked } = action.payload;
      state.likedArticles[articleId] = liked;
    },
    setFavButton: (state, action) => {
      const { blogId, favButton } = action.payload;
      state.favoriteBlogs[blogId] = favButton;
    },
  },
});

export const { setLiked, setFavButton } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

interface I_Theme {
  is_dark_mode: boolean;
  isLoading?: boolean;
  items?: any[];
  total?: number;
}

const initialState: I_Theme = {
  is_dark_mode: false,
};

export const theme__Slice = createSlice({
  name: 'my_theme',
  initialState,
  reducers: {
    set_theme_mode: (state, action) => {
      state.is_dark_mode = action.payload;
      localStorage.setItem('theme', JSON.stringify(action.payload));
    },
  },
});

export const { set_theme_mode } = theme__Slice.actions;
export default theme__Slice.reducer;

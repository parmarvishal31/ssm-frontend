import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: {},
  },
  reducers: {
    allCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});
export const { allCategory } = categorySlice.actions;
export default categorySlice.reducer;

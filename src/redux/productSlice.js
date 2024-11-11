import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
  },
  reducers: {
    allProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});
export const { allProduct } = productSlice.actions;
export default productSlice.reducer;

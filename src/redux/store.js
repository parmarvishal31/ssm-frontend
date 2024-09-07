import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import categorySlice from "./categorySlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
  },
});

export default store;

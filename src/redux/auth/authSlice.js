import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthentication: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthentication = true;
      state.user = action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    logout: (state, _action) => {
      state.isAuthentication = false;
      state.user = null;
    },
  },
});
export const { login, logout } = authSlice.actions;
export const useAuth = (state) => state.auth;
console.log("useAuth: ", useAuth);
export default authSlice.reducer;

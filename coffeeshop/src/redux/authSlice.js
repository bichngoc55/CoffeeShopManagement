import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "light",
  user: null,
  token: null,
  role: null,
  isFetching: false,
  error: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    loginStart: (state) => {
      state.isFetching = true;
    },
    setLoginFail: (state, action) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isFetching = false;
      state.error = true;
    },
    setLoginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.Position;
      state.isFetching = false;
      state.error = false;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
    },
    registerStart: (state) => {},
    registerFail: (state) => {},
    registerSuccess: (state) => {},
  },
});
export const {
  setMode,
  loginStart,
  setLoginFail,
  setLoginSuccess,
  setLogout,
  registerStart,
  registerFail,
  registerSuccess,
} = authSlice.actions;
export default authSlice.reducer;

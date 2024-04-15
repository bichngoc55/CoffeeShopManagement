import { createSlice } from "@reduxjs/toolkit";
const intialState = {
  mode: "light",
  user: null,
  token: null,
  role: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
});
export const { setMode, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;

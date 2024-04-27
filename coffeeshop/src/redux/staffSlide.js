import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "light",
  user: null,
  token: null,
  role: null,
  isFetching: false,
  error: false,
};
export const staffSlice = createSlice({
  name: "staff",
  initialState: initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    deleteStaffStart: (state) => {},
    deleteStaffFail: (state, action) => {},
    deleteStaffSuccess: (state, action) => {},
  },
});
export const {
  setMode,
  deleteStaffStart,
  deleteStaffFail,
  deleteStaffSuccess,
} = staffSlice.actions;
export default staffSlice.reducer;

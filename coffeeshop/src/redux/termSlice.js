import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo trạng thái ban đầu
const initialState = {
  terms: null,
};

// Tạo slice
export const termSlice = createSlice({
  name: "term",
  initialState: initialState,
  reducers: {
    // Định nghĩa action và reducer cho setTerm
    editTerm: (state, action) => {
      const { payload } = action;
      state.terms = state.terms.map(term => {
        return {
          ...term,
          data: payload.newData
        };
      });
    },
  },
});

// Export các action từ slice
export const { editTerm } = termSlice.actions;

// Export reducer từ slice
export default termSlice.reducer;
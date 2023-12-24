import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  totalcount: 0,
  currentPage: 1,
  dashBoardData: null,
  currentBool: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setPaginationCount: (state, action) => {
      state.totalcount = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setDashBoardData: (state, action) => {
      state.dashBoardData = action.payload;
    },
    setCurrentBool: (state, action) => {
      state.currentBool = action.payload;
    },
  },
});
export const {
  setUserData,
  setPaginationCount,
  setCurrentPage,
  setDashBoardData,
  setCurrentBool,
} = userSlice.actions;
export default userSlice.reducer;
export const selectUserData = (state) => state.user.user;
export const totalCount = (state) => state.user.totalcount;
export const currentPage = (state) => state.user.currentPage;
export const dashBoardData = (state) => state.user.dashBoardData;
export const currentBool = (state) => state.user.currentBool;

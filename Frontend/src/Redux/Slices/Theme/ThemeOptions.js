import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "themeSlice",
  initialState: {
    sidebarToggleMobile: false,
  },
  reducers: {
    // setSidebarToggleMobile(state, action) {
    //   const { sidebarToggleMobile } = action.payload;

    //   state.sidebarToggleMobile += sidebarToggleMobile;
    // },
    setSidebarToggleMobile(state) {
      state.sidebarToggleMobile = !state.sidebarToggleMobile;
    },
  },
});

export const { setSidebarToggleMobile } = themeSlice.actions;
export default themeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuList: [],
  isDrawerOpen: true,
  showSearchList: false
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSideBarMenuList: (state, action) => {
      state.menuList = action.payload;
    },
    setIsDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
    setShowSearchList: (state, action) => {
      state.showSearchList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSideBarMenuList,setIsDrawerOpen ,setShowSearchList} = sidebarSlice.actions;

export default sidebarSlice.reducer;

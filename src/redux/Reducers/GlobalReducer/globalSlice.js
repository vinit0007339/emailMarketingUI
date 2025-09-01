import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "light",
  loading: false,
  license: "",

};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLicense: (state, action) => {
      state.license = action.payload;
    },
 
  },
});

// Action creators are generated for each case reducer function
export const { setThemeMode, setLoading, setLicense } =
  globalSlice.actions;

export default globalSlice.reducer;

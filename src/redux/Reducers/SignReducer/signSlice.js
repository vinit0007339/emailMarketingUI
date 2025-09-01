import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signInfo: {},
};

export const signSlice = createSlice({
  name: "sign",
  initialState,
  reducers: {
    setSignInfo: (state, action) => {
      state.signInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSignInfo } = signSlice.actions;

export default signSlice.reducer;

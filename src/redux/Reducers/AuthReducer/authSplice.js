import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    IsLoginData:{},

};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setIsAuthenticated: (state, action)=>{
    //     state.isAuthenticated = action.payload;
    //     state.IsLoginData ={}
    // },
    setLoginData: (state, action)=> {
      // console.log('action.payload',action.payload)
      state.IsLoginData = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
  }
    
  },
});

// Action creators are generated for each case reducer function
export const { setLoginData } = authSlice.actions;

export default authSlice.reducer;

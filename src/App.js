import React, { useState, useEffect, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import RouteList from "./RouteList";
import { useSelector } from "react-redux";
import Loader from "./component/Loader";
import { axiosInstance, axiosFormInstance } from "./Utility/axiosInstances";
import { createBrowserHistory } from "history";
import { useDispatch } from "react-redux";
import { setLoading } from "./redux/Reducers/GlobalReducer/globalSlice";
import { setLoginData } from "./redux/Reducers/AuthReducer/authSplice";
import "./App.css";

import { darkTheme, lightTheme } from "./Theme";

function App() {
  const globalState = useSelector((state) => state.global);
  const { themeMode, loading } = globalState;

  const history = createBrowserHistory();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;
  const dispatch = useDispatch();

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log("error", error);
      if (error?.response?.status == "401") {
        localStorage.setItem("token", "");
        dispatch(setLoading(false));
        dispatch(setLoginData({ user: {}, isAuthenticated: false }));
        window.alert("Token expired. Please login again.");

        history.replace("/login");
        window.location.reload();
      }
      return error;
    }
  );

  axiosFormInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // or sessionStorage / cookie

    // console.log("injectAuthToken. toekn", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  axiosFormInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log("error", error);
      if (error.response?.status === 401) {
        dispatch(setLoading(false));
        dispatch(setLoginData({ user: {}, isAuthenticated: false }));
        localStorage.setItem("token", "");
        alert("Token expired. Please login again.");

        history.replace("/login");
        window.location.reload();
      }
      return Promise.reject(error); // important: reject to handle error in caller
    }
  );
  // console.log('themeMode',themeMode)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );

  // const theme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Loader loading={loading} />

      <RouteList />
    </ThemeProvider>
  );
}

export default App;

import axios from "axios";
// @ts-ignore
//import * as SecureStore from "expo-secure-store";

import { endPoints } from "../constant/Environment";
export const BASE_URL = endPoints.apiBaseUrl;
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const axiosFormInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

// const injectAuthToken = (config) => {
//   const token = localStorage.getItem("token"); // or sessionStorage / cookie

//   console.log("injectAuthToken. toekn", token);
//   if (token) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// };

// axiosInstance.interceptors.request.use(injectAuthToken);
// axiosFormInstance.interceptors.request.use(injectAuthToken);

import { combineReducers } from "redux";

import toasterSlice from "./ToasterReducer/toasterSlice";
import authSlice from "./AuthReducer/authSplice";
import globalSlice from "./GlobalReducer/globalSlice";
import sidebarSlice from "./sidebarReducer/sidebarSlice";
import signSlice  from "./SignReducer/signSlice";

const rootReducer = combineReducers({
  global: globalSlice,
  toastMsg: toasterSlice,
  auth: authSlice,
  sidebar: sidebarSlice,
  signInfo: signSlice
});

export default rootReducer;

import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./settingReducer";
import authReducer from "./authReducer";

export default configureStore({
  reducer: {
    setting: settingReducer,
    auth: authReducer,
  },
});

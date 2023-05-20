import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./settingReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

export default configureStore({
  reducer: {
    setting: settingReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});

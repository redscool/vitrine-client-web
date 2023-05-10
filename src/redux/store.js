import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./settingReducer";

export default configureStore({
  reducer: {
    setting: settingReducer,
  },
});

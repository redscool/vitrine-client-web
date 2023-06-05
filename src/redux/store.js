import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./settingReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import eventsReducer from "./eventsReducer";

export default configureStore({
  reducer: {
    setting: settingReducer,
    auth: authReducer,
    profile: profileReducer,
    events: eventsReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./settingReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import eventsReducer from "./eventsReducer";
import chatReducer from "./chatReducer";
import shelfReducer from "./shelfReducer";

export default configureStore({
  reducer: {
    setting: settingReducer,
    auth: authReducer,
    profile: profileReducer,
    events: eventsReducer,
    chat: chatReducer,
    shelf: shelfReducer
  },
});

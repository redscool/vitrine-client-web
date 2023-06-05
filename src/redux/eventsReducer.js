import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: {},
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEventsKey: (state, action) => {
      state["events"] = {};
      const [key, array] = action.payload;
      console.log(array);
      array.forEach((element) => {
        console.log(element);
      });
    },
    resetEvents: (state) => {
      for (const key in state) {
        state[key] = undefined;
      }
    },
  },
});

export const { setEventsKey, resetEvents } = eventsSlice.actions;

export const eventsKeySelector = (key) => (state) => state[key];

export default eventsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEventsKey: (state, action) => {
      const [array] = action.payload;
      array.forEach((element) => {
        const startDay = element["startTime"].substr(0, 10);
        if (!(startDay in state)) state[startDay] = [];
        state[startDay]?.push(element);
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

export const eventsKeySelector = (key) => (state) => state.events[key];

export default eventsSlice.reducer;

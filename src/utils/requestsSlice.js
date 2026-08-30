import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    storeRequests: (state, action) => {
      return action.payload;
    },
    clearRequests: (state, action) => null,
  },
});

export const { storeRequests, clearRequests } = requestsSlice.actions;
export default requestsSlice.reducer;

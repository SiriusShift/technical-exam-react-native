import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "products",
  initialState: {
    currency: "usd",
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = settingsSlice.actions;
export default settingsSlice.reducer;

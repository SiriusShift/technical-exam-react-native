import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    info: [],
  },
  reducers: {
    setProduct: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;

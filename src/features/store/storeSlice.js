import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  orders: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const storeSlice = createSlice({
  name: "Store",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
});

export const { reset } = storeSlice.actions;
export default storeSlice.reducer;

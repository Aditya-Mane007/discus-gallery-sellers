import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "../features/store/storeSlice";

const store = configureStore({
  reducer: {
    store: storeReducer,
  },
});

export default store;

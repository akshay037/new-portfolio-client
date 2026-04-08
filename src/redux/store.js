import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./adminApi";
import adminSlice from "./adminSlice";

const reduxStore = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    admin: adminSlice,
  },
  middleware: (def) => [...def(), adminApi.middleware],
});

export default reduxStore;

import { configureStore } from "@reduxjs/toolkit";

import movie from "Slices/movie";
import user from "Slices/user";
import cinema from "Slices/cinema";
import Login from "Slices/Login";
const store = configureStore({
  reducer: {
    movie,
    user,
    cinema,
    Login,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

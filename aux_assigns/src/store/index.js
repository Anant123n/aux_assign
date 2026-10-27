import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer, { STORAGE_KEY } from "./dashboardSlice";
import { saveData } from "../utils/storage";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});

store.subscribe(() => {
  saveData(STORAGE_KEY, store.getState().dashboard.categories);
});

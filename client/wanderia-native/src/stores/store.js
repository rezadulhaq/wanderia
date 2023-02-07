import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import uxSlice from "./slices/uxSlice";

export default configureStore({
  reducer: {
    nav : navReducer,
    ux : uxSlice
  }
})
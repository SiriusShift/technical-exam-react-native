import { configureStore } from "@reduxjs/toolkit";
import { api } from "../features/api";
import ProductReducer from "../features/products/reducer/productsSlice";
import SettingsReducer from "../features/settings/reducer/settingsSlice";
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    product: ProductReducer,
    settings: SettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware]), // Add the RTK Query middleware
});
export default store;

import { configureStore } from '@reduxjs/toolkit'
import CatalogSlice from './slices/CatalogSlice'
import AuthSlice from './slices/AuthSlice'
import BlogSlice from "./slices/BlogsSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    catalog: CatalogSlice,
    blogs : BlogSlice
  },
})

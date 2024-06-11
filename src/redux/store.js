import { configureStore } from '@reduxjs/toolkit'
import CatalogSlice from './slices/CatalogSlice'
import AuthSlice from './slices/AuthSlice'
import BlogSlice from "./slices/BlogsSlice";
import ResoursesSlice from './slices/ResoursesSlice';

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    catalog: CatalogSlice,
    resourses: ResoursesSlice,
    blogs : BlogSlice,
  },
})

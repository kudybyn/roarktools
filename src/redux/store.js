import { configureStore } from '@reduxjs/toolkit'
import CatalogSlice from './slices/CatalogSlice'
import AuthSlice from './slices/AuthSlice'

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    catalog: CatalogSlice,
  },
})

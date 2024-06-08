import { configureStore } from '@reduxjs/toolkit'
import CatalogSlice from 'components/Catalog/CatalogSlice'

export const store = configureStore({
  reducer: {
    catalog: CatalogSlice,
  },
})

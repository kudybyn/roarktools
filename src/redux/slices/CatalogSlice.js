// dataSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import db from '../../firebase/config'

export const fetchData = createAsyncThunk(
  'catalog/fetchData',
  async ({ collectionName, type }) => {
    const querySnapshot = await getDocs(collection(db, collectionName))
    const fetchedData = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data()[type][0],
      }
    })
    return fetchedData
  }
)
//shit
export const fetchCatalogDataById = createAsyncThunk(
  'data/fetchDataById',
  async ({ collectionName, type, id }, thunkAPI) => {
    try {
      // Fetch the document that contains the array
      const docRef = doc(db, collectionName, type)
      const docSnapshot = await getDoc(docRef)

      if (docSnapshot.exists()) {
        const data = docSnapshot.data()
        const item = data.catalog.find((item) => item.id === id)
        if (item) {
          return item
        } else {
          throw new Error('Item not found in catalog')
        }
      } else {
        throw new Error('Document not found')
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    data: [],
    catalogItem: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchCatalogDataById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCatalogDataById.fulfilled, (state, action) => {
        state.catalogItem = action.payload
        state.loading = false
      })
      .addCase(fetchCatalogDataById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default catalogSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const bucketSlice = createSlice({
  name: 'bucket',
  initialState: {
    data: [],
  },
  reducers: {
    add: (state, action) => {
      state.data.push(action.payload)
    },
    remove: (state, action) => {
      state.data = state.data.filter(
        (product) => product.id !== action.payload.id
      )
    },
    removeAll: (state) => {
      state.data = []
    },
    addNewProducts: (state, action) => {
      console.log('action', action.payload)
      state.data = action.payload
    },
  },
})

export const { add, remove, removeAll, addNewProducts } = bucketSlice.actions

export default bucketSlice.reducer

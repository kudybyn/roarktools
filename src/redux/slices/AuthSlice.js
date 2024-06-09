// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authAccessToken: '',
  },
  reducers: {
    setAuthAccessToken(state, action) {
      state.authAccessToken = action.payload
    },
  },
})

export const { setAuthAccessToken } = authSlice.actions
export default authSlice.reducer

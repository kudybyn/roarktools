// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebase/config';

export const fetchData = createAsyncThunk('blog/fetchData', async ({collectionName,type}) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const fetchedData = querySnapshot.docs.map(doc => {
    return({
    ...doc.data()[type]
  })});
  return Object.values(fetchedData);
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;

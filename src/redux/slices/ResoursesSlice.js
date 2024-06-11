// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebase/config';

export const fetchData = createAsyncThunk('resourses/fetchData', async ({collectionName,type}) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const fetchedData = querySnapshot.docs.map(doc => {
    const result = doc.data()[type]
    return({
      ...result
  })});
  return fetchedData;
});

const resoursesSlice = createSlice({
  name: 'resourses',
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

export default resoursesSlice.reducer;

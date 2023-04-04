import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getInterviewTitleApi } from '../api/interview';

const initialState = {
  interviewTitleList: null,
}

const fetchInterviewTitleList = createAsyncThunk('fetchInterviewTitleList', async() => {
  const res = await getInterviewTitleApi();
  return res.data;
})

export const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    setInterviewTitleList(state, {payload}) {
      state.interviewTitleList = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInterviewTitleList.fulfilled, (state, {payload}) => {
      state.interviewTitleList = payload;
    })
  }
})

export { fetchInterviewTitleList }

export default interviewSlice.reducer;
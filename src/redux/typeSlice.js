import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTypeListApi } from '../api/type';

const initialState = {
  typeList: [],
}

const fetchTypeList = createAsyncThunk('type/fetchTypeList', async () => {
  const res = await getTypeListApi();
  return res.data;
})

export const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    increment: (state) => {

    },
    decrement: (state) => {
    },
    incrementByAmount: (state, action) => {
    },
    setTypeList: (state, { payload }) => {
      state.typeList = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTypeList.fulfilled, (state, {payload}) => {
      state.typeList = payload
    })
    // 后面可以继续addCase
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = typeSlice.actions
export { fetchTypeList }

export default typeSlice.reducer
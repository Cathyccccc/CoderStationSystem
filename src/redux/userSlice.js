import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 修改state
    setUserInfo(state, {payload}) {
      state.userInfo = payload
    },
    updateUserInfo(state, {payload}) {
      for (const prop in payload) {
        state.userInfo[prop] = payload[prop]
      }
    }
  },
})

export const { setUserInfo, updateUserInfo } = userSlice.actions

export default userSlice.reducer
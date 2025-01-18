import { createSlice } from '@reduxjs/toolkit';

const loginStateSlice = createSlice({
  name: 'loginState',
  initialState: {
    currentLoginState: 'out',
  },
  reducers: {
    setLoginState: (state, action) => {
      state.currentState = action.payload;
    },
  },
});

export const { setLoginState } = loginStateSlice.actions;
export default loginStateSlice.reducer;
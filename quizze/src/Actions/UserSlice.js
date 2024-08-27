// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword:''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setConfirmPassword(state, action) {
      state.confirmPassword = action.payload;
    },
    clearForm(state) {
      state.name = '';
      state.email = '';
      state.password = '';
      state.confirmPassword = '';
    }
  }
});

export const { setName, setEmail, setPassword, setConfirmPassword, clearForm } = userSlice.actions;
export default userSlice.reducer;


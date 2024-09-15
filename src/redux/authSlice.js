// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usuarioAutenticado: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.usuarioAutenticado = action.payload.usuario;
      state.token = action.payload.token;

    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.usuarioAutenticado = null;
      state.token = null;

    }
  }
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
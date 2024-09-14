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
      // Armazene o token no localStorage aqui, se necessário
    },
    logout: (state) => {
      state.usuarioAutenticado = null;
      state.token = null;
      // Remova o token do localStorage aqui, se necessário
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
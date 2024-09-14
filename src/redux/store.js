import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import transactionsReducer from './transactionsSlice'; // Importe o reducer de transações

const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer 
  },
});

export default store;
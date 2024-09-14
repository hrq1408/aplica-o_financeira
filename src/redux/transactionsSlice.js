import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [], // Estado para armazenar todas as transações
  filteredTransactions: [], // Estado para armazenar as transações filtradas
  loading: false, // Estado para indicar se as transações estão sendo carregadas
  error: null // Estado para armazenar mensagens de erro
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
      state.filteredTransactions = action.payload; // Inicialmente, todas as transações são exibidas
      state.loading = false; // Indica que o carregamento foi concluído
      state.error = null; // Limpa qualquer erro anterior
    },
    filterTransactions: (state, action) => {
      const { tipo, periodo, dataInicio, dataFim, valorMin, valorMax } = action.payload;

      let filtered = state.transactions;

      if (tipo) {
        filtered = filtered.filter(transaction => transaction.tipo === tipo);
      }

      if (periodo) {
        const hoje = new Date();
        const dataInicialPeriodo = new Date(hoje.getTime() - (periodo * 24 * 60 * 60 * 1000)); // Converte o período em milissegundos
        filtered = filtered.filter(transaction => new Date(transaction.data) >= dataInicialPeriodo);
      }

      if (dataInicio && dataFim) {
        filtered = filtered.filter(transaction =>
          new Date(transaction.data) >= new Date(dataInicio) &&
          new Date(transaction.data) <= new Date(dataFim)
        );
      }

      if (valorMin) {
        filtered = filtered.filter(transaction => transaction.valor >= parseFloat(valorMin));
      }

      if (valorMax) {
        filtered = filtered.filter(transaction => transaction.valor <= parseFloat(valorMax));
      }

      state.filteredTransactions = filtered;
    },
    setTransactionsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setTransactionsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { setTransactions, filterTransactions, setTransactionsLoading, setTransactionsError } = transactionsSlice.actions;
export default transactionsSlice.reducer;
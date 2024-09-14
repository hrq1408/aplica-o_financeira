import axios from 'axios';

const API_URL = 'http://localhost:3001'; 

export const fetchTransactions = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/transacoes?remetente=${userId}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error; 
  }
};
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const login = async (email, senha) => {
  try {
    const response = await axios.get(`${API_URL}/usuarios`, {
      params: {
        email: email,
        senha: senha
      }
    });

    if (response.data.length > 0) {
      const usuario = response.data[0];
      const token = 'seu_token_jwt_simulado';

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify({ id: usuario.id, nome: usuario.nome }));

      return { usuario, token };
    } else {
      throw new Error('Credenciais inválidas!');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw new Error('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
  }


};

export const updateUserBalance = async (userId, newBalance) => {
  try {
    const response = await axios.patch(`${API_URL}/usuarios/${userId}`, { saldo: newBalance });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar o saldo do usuário:', error);
    throw error;
  }
};
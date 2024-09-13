import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; 

// Função para simular o login e retornar um token JWT (mock)
export const Login = async (email, senha) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/usuarios`, {
      params: {
        email: email,
        senha: senha 
      }
    });

    if (response.data.length > 0) {
      const usuario = response.data[0];

      // Simulando a geração de um token JWT no backend
      const token = 'seu_token_jwt_simulado'; 

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      return { success: true, token, usuario };
    } else {
      return { success: false, error: 'Credenciais inválidas!' };
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return { success: false, error: 'Ocorreu um erro ao fazer login. Tente novamente mais tarde.' };
  }
};

// Função para simular o logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
};

// Função auxiliar para obter o token do localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Configuração do Axios para incluir o token JWT no cabeçalho Authorization
axios.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error  => {
    return Promise.reject(error);

  }
);
export default Login;
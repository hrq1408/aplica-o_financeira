import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Login.css';
import { useDispatch } from 'react-redux';
import {login} from '../redux/authSlice';

function Login({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    try {
      const response = await axios.get('http://localhost:3001/usuarios', {
        params: {
          email: email,
          senha: senha 
        }
      });

      if (response.data.length > 0) {
        const usuario = response.data[0];
        const token = 'seu_token_jwt_simulado'; 

        dispatch(login({ usuario, token }));
        navigate('/home'); 

        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify({ id: usuario.id, nome: usuario.nome }));        
      } else {
        setErro('Credenciais inválidas!');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErro('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="popup-janela">
      <div className="popup-geral">
        <button className="fechar-button" onClick={onClose}>X</button>
        <h2>Login</h2>
        {erro && <div className="error">{erro}</div>} 
        <form onSubmit={handleSubmit}>
          <div className="form-g">
            <label htmlFor="email">Usuário (email):</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-g">
            <label htmlFor="senha">Senha:</label>
            <input 
              type="password" 
              id="senha" 
              name="senha" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
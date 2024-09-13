import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Login.css';

function Login({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resultadoLogin = await Login(email, senha);

    if (resultadoLogin.success) {
      navigate('/home'); 
    } else {
      setErro(resultadoLogin.error);
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
            <label htmlFor="email">Usuário (email):</label> {/* Alterado para email */}
            <input 
              type="email" 
              id="email" 
              name="email"  // Alterado para email
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as dispatchLogin } from '../../redux/authSlice'; 
import LoginRegister from '../feature/auth/LoginRegister';
import { login as authServiceLogin } from '../../auth/authService';

const LoginFormContainer = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { usuario, token } = await authServiceLogin(email, senha);
      dispatch(dispatchLogin({ usuario, token }));
      navigate('/home'); 
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <div className="popup-janela">
      <div className="popup-geral">
      {/* <button className="fechar-button" onClick={onClose}>X</button>*/}
        <h2 className='login-title'>Login</h2>
        <LoginRegister
          email={email}
          senha={senha}
          onChangeEmail={(e) => setEmail(e.target.value)} 
          onChangeSenha={(e) => setSenha(e.target.value)} 
          onSubmit={handleSubmit}
          erro={erro}
        />
      </div>
    </div>
  );
};

export default LoginFormContainer;
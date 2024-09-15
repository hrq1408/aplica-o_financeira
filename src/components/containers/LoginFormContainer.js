import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login as dispatchLogin, updateUser } from '../../redux/authSlice';
import LoginRegister from '../feature/auth/LoginRegister';
import { login as authServiceLogin, updateUserBalance } from '../feature/auth/AuthService';



const LoginFormContainer = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuarioLogado = useSelector(state => state.auth.user);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    cpf: '',
    nomefavorecido: '',
    banco: '',
    agencia: '',
    conta: '',
    chave: '',
    valortranferir: '',
    datatransferencia: '',
  });

  const calcularNovoSaldo = (saldoAtual, valorTransferencia) => {
    return saldoAtual - valorTransferencia;
  };


  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { usuario, token } = await authServiceLogin(email, senha);
      dispatch(dispatchLogin({ usuario, token }));

      if (isSubmitted) {
        const newBalance = calcularNovoSaldo(usuarioLogado.saldo, formData.valortranferir);
        const updatedUser = await updateUserBalance(usuarioLogado.id, newBalance);
        dispatch(updateUser(updatedUser));
      }
      console.log('formData' + formData.valortranferir);

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
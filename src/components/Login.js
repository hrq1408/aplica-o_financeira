import React, { useState } from 'react';
import LoginFormContainer from '../components/containers/LoginFormContainer';
import '../styles/components/Login.css'

const Login = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <LoginFormContainer isOpen={isOpen} onClose={handleClose} />
  );
};

export default Login;
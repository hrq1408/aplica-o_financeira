import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    dispatch(logout());

    navigate('/');
  };

  return (
    <button onClick={handleLogout}>Sair</button>
  );
};

export default Logout;
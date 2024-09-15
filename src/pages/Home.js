import React, { useState, useEffect } from 'react';
import '../styles/pages/Home.css';
import Cadastro from '../pages/Transactions';
import { featchBancoUsuarios } from '../api/api';
import Menu from '../components/Menu';

const Home = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    featchBancoUsuarios()
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar usuários:', error);
      });
    const usuarioLocalStorage = localStorage.getItem('usuario');
    if (usuarioLocalStorage) {
      setUsuarioLogado(JSON.parse(usuarioLocalStorage));
    }
  }, []);

  usuarioLogado && console.log(usuarios.find(usuario => usuario.id === usuarioLogado.id));


  return (
    <div className="home-container">
      <Menu />
      <main className="main-content">
        <div className="welcome-usuario">
          <h1>Seja bem vindo(a),</h1>
          <span className='usuario-logado'></span>
        </div>


        <section className="home-conta">
          <div className="saldo-conta">
            <p>Saldo:</p>
            {usuarios.find(usuario => usuario.id === usuarioLogado.id) && (
              <h2>R$ {usuarios.find(usuario => usuario.id === usuarioLogado.id).saldo?.toFixed(2) || '0.00'}</h2>
            )}
          </div>

        </section>
        <Cadastro />
      </main>
    </div>
  );
};

export default Home;
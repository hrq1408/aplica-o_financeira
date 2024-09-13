import React, { useState, useEffect } from "react";
import '../styles/pages/Home.css';
import { Link } from 'react-router-dom';
import Cadastro from '../pages/Transactions';
import { featchBancoUsuarios  } from '../api/api';

const Home = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    featchBancoUsuarios ()
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
    <div>
    <div className="container-button">
      <div className="icon-group">
        <button className="button-ic">
          <i className="fas fa-home"></i>
        </button>
        <p className="icon-info">Início</p>
      </div>
      <div className="icon-group">
        <button className="button-ic">
        <i class="fa-solid fa-list"></i>
        </button>
        <p className="icon-text">Resumo</p>
    </div>
    </div>
    <div className="value-card">
      <div className="value-content">
      {usuarioLogado && (
            <div>
            <h2>Bem-vindo, {usuarioLogado.nome}!</h2>
            {usuarios.find(usuario => usuario.id === usuarioLogado.id) && ( 
              <h2 className="value-balance">R$ {usuarios.find(usuario => usuario.id === usuarioLogado.id).saldo?.toFixed(2) || '0.00'}</h2>
            )}            
            <Link to={`/lista/${usuarioLogado.id}`}>              <> 
                <p className="listar-info">Listar</p>              
                
              </>
            </Link> 
            <Cadastro /> 
          </div>        
       )}

        
      </div>
      <div className="banner-advertising">
        <p>Espaço para Banner</p>
      </div>
    </div>
    </div>    
  );
}

export default Home;
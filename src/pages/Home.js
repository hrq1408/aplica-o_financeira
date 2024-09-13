import React from "react";
import '../styles/pages/Home.css';
import Cadastro from '../pages/Transactions';

const Home = () => {
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
        <h2 className="value-balance">R$ 1.500,00</h2>
        <p className="listar-info">Listar</p>
        <Cadastro />
      </div>
      <div className="banner-advertising">
        <p>Espaço para Banner</p>
      </div>
    </div>
    </div>


    
  );
}

export default Home;
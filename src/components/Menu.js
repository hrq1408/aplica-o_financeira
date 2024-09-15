import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { featchBancoUsuarios  } from '../api/api';

const Menu = () => {
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

  return (
    <aside className="sidebar">        
    <nav>
    {usuarioLogado && (
      <ul>
     <Link to={`/home`}>              
        <p className="listar-info"><li>Home</li></p>              
    </Link>   
        
        
    <Link to={`/lista/${usuarioLogado.id}`}>            
        <p className="listar-info"><li >Antecipar</li></p>           
    </Link>            
      </ul>
       )}  
    </nav>
  </aside>
    );
}

export default Menu;

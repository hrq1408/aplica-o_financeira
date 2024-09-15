import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../styles/components/Menu.css';
import Logout from '../components/Logout';

const Menu = () => {

  const [usuarioLogado, setUsuarioLogado] = useState(null);
  useEffect(() => {

    const usuarioLocalStorage = localStorage.getItem('usuario');
    if (usuarioLocalStorage) {
      setUsuarioLogado(JSON.parse(usuarioLocalStorage));
    }
  }, []);

  return (
    <aside className="sidebar">
      <div class="avatar">
        <div class="avatar__img">
          <img src="https://picsum.photos/70" alt="avatar"></img>
        </div>
        <div class="avatar__name">{usuarioLogado && (usuarioLogado.nome)}</div>
      </div>
      <nav className="menu">

        {usuarioLogado && (
          <ul>
            <Link className="menu__item" to={`/home`}>
              <li className="menu_title">Home</li>
            </Link>


            <Link className="menu__item" to={`/lista/${usuarioLogado.id}`}>
              <li >Antecipar</li>
            </Link>

            
          </ul>
        )}
      </nav>
      <Logout className="menu__item" />
    </aside>
  );
}

export default Menu;

import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/Header.css';

const Header = () => {
  const [count, setCount] = useState(0);
    return (
        <header>          
          <div class="bank">
          <h1>Banco</h1>       
          </div>    
        </header>        
      );
    }
export default Header;

import '../styles/pages/Home.css';
import React, { useState, useEffect, useRef } from 'react';
import Login from '../components/Login';


function Bemvindo() {
    const paragraphRefs = useRef([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
       
      const handleClosePopup = () => {
        setIsPopupOpen(false);
      };    
  
    return (

            <div>                  
                <Login isOpen={isPopupOpen} onClose={handleClosePopup} />
            </div>
    );
  }
  
  export default Bemvindo;
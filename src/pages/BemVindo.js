
import '../styles/pages/Home.css';
import React, { useState, useEffect, useRef } from 'react';
import Login from '../components/Login';


function Bemvindo() {
    const paragraphRefs = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentParagraph, setCurrentParagraph] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const paragraphs = [
      "Olá! ",
      "Seja bem-vindo(a)!",
      "Banco!"
    ];
    const handleOpenPopup = () => {
        setIsPopupOpen(true);
      };
    
      const handleClosePopup = () => {
        setIsPopupOpen(false);
      };
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (currentIndex < paragraphs[currentParagraph].length) {
          setCurrentIndex(currentIndex + 1);
        } else if (currentParagraph < paragraphs.length - 1) {
          setCurrentParagraph(currentParagraph + 1);
          setCurrentIndex(0);
        } else {
          clearInterval(interval);
        }
      }, 50);
  
      return () => clearInterval(interval);
    }, [currentIndex, currentParagraph]);
  
    const setParagraphRef = (element, index) => {
      if (element) {
        paragraphRefs.current[index] = element;
      }
    };
  
    useEffect(() => {
      if (paragraphRefs.current[currentParagraph]) {
        paragraphRefs.current[currentParagraph].textContent = paragraphs[currentParagraph].substring(0, currentIndex);
      }
    }, [currentIndex, currentParagraph]);
  
    return (
      <div>
        {paragraphs.map((paragraph, index) => (
          <div>
            <div className={`container${index}`}>
            <h1 key={index} ref={(element) => setParagraphRef(element, index)}></h1>
            </div>
        </div>        
        ))}
            <div>  
                <button onClick={handleOpenPopup}>Login</button>
                <Login isOpen={isPopupOpen} onClose={handleClosePopup} />
            </div>
      </div>
    );
  }
  
  export default Bemvindo;
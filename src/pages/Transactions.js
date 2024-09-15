import React, { useState, useEffect } from "react";
import '../styles/pages/Transactions.css';
import { featchBancoUsuarios } from '../api/api';


const Transactions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [formData, setFormData] = useState({
    cpf: '',
    nomefavorecido: '',
    banco: '',
    agencia: '',
    conta: '',
    chave: '',
    valortranferir: '',
    datatransferencia: '',
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setIsSubmitted(false);


    setFormData({
      cpf: '',
      nomefavorecido: '',
      banco: '',
      agencia: '',
      conta: '',
      chave: '',
      valortranferir: '',
      datatransferencia: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  const handleConfirm = () => {
    alert("Compra confirmada!");
    togglePopup();
  };

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
    <div>
      <button className="open-popup-btn" onClick={togglePopup}>
        Realizar transação (Pix)
      </button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="fechar-button-login" onClick={togglePopup}>
              X
            </button>
            {!isSubmitted ? (
              <>
                <h2>Realizar transação</h2>
                {usuarios.find(usuario => usuario.id === usuarioLogado.id) && (
                  <p>Saldo da conta: R$ {usuarios.find(usuario => usuario.id === usuarioLogado.id).saldo?.toFixed(2) || '0.00'}</p>
                )}

                <form className="cadastro-form" onSubmit={handleSubmit}>
                  <label>
                    CPF:
                    <input
                      type="number"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Nome do favorecido:
                    <input
                      type="text"
                      name="nomefavorecido"
                      value={formData.nomefavorecido}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Banco:
                    <input
                      type="text"
                      name="banco"
                      value={formData.banco}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Agência:
                    <input
                      type="text"
                      name="agencia"
                      value={formData.agencia}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Conta:
                    <input
                      type="number"
                      name="conta"
                      value={formData.conta}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Chave Pix:
                    <input
                      type="number"
                      name="chave"
                      value={formData.chave}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Valor a transferir:
                    <input
                      type="number"
                      name="valortranferir"
                      value={formData.valortranferir}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Date da transferência:
                    <input
                      type="date"
                      name="datatransferencia"
                      value={formData.datatransferencia}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <button type="submit">Enviar valor</button>
                </form>
              </>
            ) : (
              <div className="resumo-compra">
                <h2>Resumo da Compra</h2>
                <p><strong>Saldo da conta:</strong> R$ 199,99</p>
                <p><strong>CPF:</strong> {formData.cpf}</p>
                <p><strong>Nome Favorecido:</strong> {formData.nomefavorecido}</p>
                <p><strong>Banco:</strong> {formData.banco}</p>
                <p><strong>Agência:</strong> {formData.agencia}</p>
                <p><strong>Conta:</strong> {formData.conta}</p>
                <p><strong>Chave (PIX):</strong> {formData.chave}</p>
                <p><strong>Data Transferência :</strong> {formData.datatransferencia}</p>

                <button onClick={handleEdit} className="edit-popup-btn">
                  Editar
                </button>
                <button onClick={handleConfirm} className="confirm-popup-btn">
                  Confirmar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTransacoesPorUsuario } from '../services/transactionService';

const TransactionList = () => {
  const { userId } = useParams(); 
  const [transacoes, setTransacoes] = useState([]);
  useEffect(() => {
    fetchTransacoesPorUsuario(userId)
      .then(response => setTransacoes(response.data));
  }, [userId]); 

  return (
    <div>
      <h2>Transações do Usuário {userId}</h2>
      <ul>
        {transacoes.map(transacao => (
          <li key={transacao.id}>
            <p>Tipo: {transacao.tipo}</p>
            <p>Data: {transacao.data}</p>
            <p>Valor: R${transacao.valor.toFixed(2)}</p>
            {transacao.tipo === 'TED' && (
              <>
                <p>Banco Favorecido: {transacao.banco_favorecido}</p>
                <p>Agência: {transacao.agencia_favorecido}</p>
                <p>Conta: {transacao.conta_favorecido}</p>
              </>
            )}
            {transacao.tipo === 'PIX' && (
              <p>Chave PIX: {transacao.chave_pix}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
import React from "react";

const TransactionItem = ({ transaction }) => {
    
    console.log('teste2', JSON.stringify(transaction, null, 2))

  return (
    <li>
      <p>Tipo: {transaction.tipo}</p>
      <p>Data: {transaction.data}</p>
      <p>Valor: R${transaction.valor}</p>
      <p>Saldo: </p> {/* Você pode precisar ajustar a lógica do saldo */}
      {transaction.tipo === 'TED' && (
        <>
          <p>Banco Favorecido: {transaction.banco_favorecido}</p>
          <p>Agência: {transaction.agencia_favorecido}</p>
          <p>Conta: {transaction.conta_favorecido}</p>
        </>
      )}
      {transaction.tipo === 'PIX' && (
        <p>Chave PIX: {transaction.chave_pix}</p>
      )}
    </li>
  );
};

export default TransactionItem;
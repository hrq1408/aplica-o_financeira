import React from "react";
import TransactionItem from "./TransactionItem";

const TransactionList = ({ transactions }) => {
  console.log('teste', JSON.stringify(transactions, null, 2))
  return (
    <ul>
      {transactions.map(transaction => (
        <TransactionItem key={transaction.remetente} transaction={transaction} />
      ))}
    </ul>
  );
};

export default TransactionList;
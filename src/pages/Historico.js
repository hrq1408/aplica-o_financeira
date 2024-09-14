import React, { useState } from "react";
import TransactionsFilterContainer from '../components/containers/TransactionsFilterContainer';
import TransactionList from '../components/feature/history/TransactionList';

const History = () => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const handleFilterChange = (filteredData) => {
    setFilteredTransactions(filteredData);    
    console.log('teste3', JSON.stringify(filteredData, null, 2))

  };

  return (
    <div>
      <h1>Lista de Transações</h1>
      <TransactionsFilterContainer onFilterChange={handleFilterChange} />      
    </div>
  );
};

export default History;
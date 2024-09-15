import React, { useState } from "react";
import TransactionsFilterContainer from '../components/containers/TransactionsFilterContainer';
import TransactionList from '../components/feature/history/TransactionList';
import '../styles/pages/Historico.css';

const History = () => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const handleFilterChange = (filteredData) => {
    setFilteredTransactions(filteredData);    
    console.log('teste3', JSON.stringify(filteredData, null, 2))

  };

  return (
    <div>      
      <TransactionsFilterContainer onFilterChange={handleFilterChange} />      
    </div>
  );
};

export default History;
import React, { useState, useEffect } from "react";
import axios from 'axios';

const periods = [
  { label: '7 Dias', value: 7 },
  { label: '15 Dias', value: 15 },
  { label: '30 Dias', value: 30 },
  { label: '90 Dias', value: 90 },
];


const Historico = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [periodFilter, setPeriodFilter] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/transacoes/');
        setTransactions(response.data);
        setFilteredTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const filterTransactions = () => {
      let filtered = transactions;

      if (typeFilter) {
        filtered = filtered.filter(transaction => transaction.tipo === typeFilter);
      }

      if (periodFilter) {
        const periodDate = new Date();
        periodDate.setDate(periodDate.getDate() - periodFilter);
        filtered = filtered.filter(transaction => new Date(transaction.data) >= periodDate);
      }

      if (startDate && endDate) {
        filtered = filtered.filter(transaction => 
          new Date(transaction.data) >= new Date(startDate) &&
          new Date(transaction.data) <= new Date(endDate)
        );
      }

      if (minValue) {
        filtered = filtered.filter(transaction => transaction.valor >= minValue);
      }
      if (maxValue) {
        filtered = filtered.filter(transaction => transaction.valor <= maxValue);
      }

      filtered.sort((a, b) => {
        return sortOrder === 'asc' 
          ? new Date(a.data) - new Date(b.data) 
          : new Date(b.data) - new Date(a.data);
      });

      setFilteredTransactions(filtered);
    };

    filterTransactions();
  }, [typeFilter, periodFilter, startDate, endDate, minValue, maxValue, sortOrder, transactions]);

  return (
    <div>
      <h1>Lista de Transações</h1>
      
      <div>
        <label>
          Tipo de Transferência:
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="">Todos</option>
            <option value="TED">TED</option>
            <option value="PIX">PIX</option>
          </select>
        </label>
        
        <label>
          Período:
          <select value={periodFilter || ''} onChange={e => setPeriodFilter(Number(e.target.value) || null)}>
            <option value="">Selecionar</option>
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </label>
        
        <label>
          Data Inicial:
          <input 
            type="date" 
            value={startDate} 
            onChange={e => setStartDate(e.target.value)} 
          />
        </label>
        
        <label>
          Data Final:
          <input 
            type="date" 
            value={endDate} 
            onChange={e => setEndDate(e.target.value)} 
          />
        </label>
        
        <label>
          Valor Mínimo:
          <input 
            type="number" 
            value={minValue} 
            onChange={e => setMinValue(e.target.value)} 
          />
        </label>
        
        <label>
          Valor Máximo:
          <input 
            type="number" 
            value={maxValue} 
            onChange={e => setMaxValue(e.target.value)} 
          />
        </label>
        
        <label>
          Ordenar por Data:
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="asc">Mais Antigo</option>
            <option value="desc">Mais Recente</option>
          </select>
        </label>
      </div>
      
      <ul>
        {filteredTransactions.map(transaction => (
          <li key={transaction.id}>
            <p>Tipo: {transaction.tipo}</p>
            <p>Data: {transaction.data}</p>
            <p>Valor: R${transaction.valor}</p>
            <p>Saldo: {/* Aqui você pode adicionar o cálculo do saldo com base nas transações */}</p>
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
        ))}
      </ul>
    </div>
  );
};

export default Historico;
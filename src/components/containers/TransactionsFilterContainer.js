import React, { useState, useEffect,  useMemo } from "react";
import { useParams } from 'react-router-dom';
import { fetchTransactions } from '../../services/transactionService';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { featchBancoUsuarios } from '../../api/api';
import Menu from '../../components/Menu';

const periods = [
  { label: '7 Dias', value: 7 },
  { label: '15 Dias', value: 15 },
  { label: '30 Dias', value: 30 },
  { label: '90 Dias', value: 90 },
];

const TransactionsFilterContainer = ({ onFilterChange }) => {
  const [transactions, setTransactions] = useState([]);
  
  const [typeFilter, setTypeFilter] = useState('');
  const [periodFilter, setPeriodFilter] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const { userId } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    if (typeFilter) {
      filtered = filtered.filter(transaction => transaction.tipo.toLowerCase().trim() === typeFilter.toLowerCase().trim());
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
      filtered = filtered.filter(transaction => transaction.valor >= parseFloat(minValue));
    }
    if (maxValue) {
      filtered = filtered.filter(transaction => transaction.valor <= parseFloat(maxValue));
    }

    return filtered.sort((a, b) => {
      return sortOrder === 'asc' 
        ? new Date(a.data) - new Date(b.data) 
        : new Date(b.data) - new Date(a.data);
    });
  }, [transactions, typeFilter, periodFilter, startDate, endDate, minValue, maxValue, sortOrder]);


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

  useEffect(() => {
    const fetchAndSetTransactions = async () => {
      try {
        const data = await fetchTransactions(userId);
        setTransactions(data);
        
      } catch (error) {
        // Handle error appropriately
      }
    };

    fetchAndSetTransactions();
  }, [userId]);

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

      
    };

    filterTransactions();
    onFilterChange(filteredTransactions);
  }, [typeFilter, periodFilter, startDate, endDate, minValue, maxValue, sortOrder, transactions]);

  return (
    <div className="home-container">
      <Menu />
      <div className="container-form">
        <label>
          <Select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} options={[
            { label: 'Todos', value: '' },
            { label: 'TED', value: 'TED' },
            { label: 'PIX', value: 'PIX' },
          ]} />
        </label>

        <label>
          Período:
          <Select value={periodFilter || ''} onChange={e => setPeriodFilter(Number(e.target.value) || null)} options={[
            { label: 'Selecionar', value: '' },
            ...periods
          ]} />
        </label>

        <label>
          Data Inicial:
          <Input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>

        <label>
          Data Final:
          <Input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </label>

        <label>
          Valor Mínimo:
          <Input
            type="number"
            value={minValue}
            onChange={e => setMinValue(e.target.value)}
          />
        </label>

        <label>
          Valor Máximo:
          <Input
            type="number"
            value={maxValue}
            onChange={e => setMaxValue(e.target.value)}
          />
        </label>

        <label>
          Ordenar por Data:
          <Select value={sortOrder} onChange={e => setSortOrder(e.target.value)} options={[
            { label: 'Mais Antigo', value: 'asc' },
            { label: 'Mais Recente', value: 'desc' },
          ]} />
        </label>
      </div>

      <ul className="transaction-box">
        {Array.isArray(filteredTransactions) && filteredTransactions.map(transaction => (
          <li className="transaction-box" key={transaction.id}>
            <p>Tipo: {transaction.tipo}</p>
            <p>Data: {transaction.data}</p>
            <p>Valor: R${transaction.valor}</p>
            <p>Saldo: </p> {/* You might need to adjust the balance logic */}
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

export default TransactionsFilterContainer;
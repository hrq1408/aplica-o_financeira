import React, { useState } from 'react';

const periods = [
  { label: '7 Dias', value: 7 },
  { label: '15 Dias', value: 15 },
  { label: '30 Dias', value: 30 },
  { label: '90 Dias', value: 90 },
];

const TransactionFilter = ({ onFilterChange }) => {
  const [tipo, setTipo] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [valorMin, setValorMin] = useState('');
  const [valorMax, setValorMax] = useState('');

  const handleApplyFilter = () => {
    onFilterChange({ tipo, periodo, dataInicio, dataFim, valorMin, valorMax });
  };

  return (
    <div>
      <label htmlFor="tipo">
        Tipo de Transferência:
        <select id="tipo" value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="">Todos</option>
          <option value="TED">TED</option>
          <option value="PIX">PIX</option>
        </select>
      </label>

      <label htmlFor="periodo">
        Período:
        <select id="periodo" value={periodo} onChange={e => setPeriodo(e.target.value)}>
          <option value="">Selecionar</option>
          {periods.map(period => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="dataInicio">
        Data Inicial:
        <input
          type="date"
          id="dataInicio"
          value={dataInicio}
          onChange={e => setDataInicio(e.target.value)}
        />
      </label>

      <label htmlFor="dataFim">
        Data Final:
        <input
          type="date"
          id="dataFim"
          value={dataFim}
          onChange={e => setDataFim(e.target.value)}
        />
      </label>

      <label htmlFor="valorMin">
        Valor Mínimo:
        <input
          type="number"
          id="valorMin"
          value={valorMin}
          onChange={e => setValorMin(e.target.value)}
        />
      </label>

      <label htmlFor="valorMax">
        Valor Máximo:
        <input
          type="number"
          id="valorMax"
          value={valorMax}
          onChange={e => setValorMax(e.target.value)}
        />
      </label>

      <button onClick={handleApplyFilter}>Aplicar Filtro</button>
    </div>
  );
};

export default TransactionFilter;
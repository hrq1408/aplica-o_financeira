import React, { useState } from 'react';

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
      <button onClick={handleApplyFilter}>Aplicar Filtro</button>
    </div>
  );
};

export default TransactionFilter;
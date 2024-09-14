import React from 'react';

const Input = ({ type, id, name, value, onChange, label, required }) => {
  return (
    <div className="form-g">
      <label htmlFor={id}><b>{label}:</b></label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
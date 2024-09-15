import React from 'react';
import Input from '../../ui/Input';

const LoginRegister = ({ email, senha, onChangeEmail, onChangeSenha, onSubmit, erro }) => {
  console.log( 'LoginRegister', email );
  return (
    <form onSubmit={onSubmit}>
      <Input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={onChangeEmail}
        label="Usuário (email)"
        required
      />
      <Input
        type="password"
        id="senha"
        name="senha"
        value={senha}
        onChange={onChangeSenha}
        label="Senha"
        required
      />
      {erro && <div className="error">{erro}</div>}
      <button className="button-login" type="submit">Login</button>
    </form>
  );
};

export default LoginRegister;
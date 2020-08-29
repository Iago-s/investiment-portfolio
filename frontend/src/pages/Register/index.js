import React from 'react';

import './styles.css';

import Input from '../../components/Input';
import Button from '../../components/Button';
import LinkNavigation from '../../components/LinkNavigation';

const Register = () => {
  return(
    <div className="container-register">
      <div className="form-container-register">
        <form>
          <h1>Criar conta</h1>
          <p>Email</p>
          <Input type="email" />
          <p>Senha</p>
          <Input type="password" />
          <Button text="Cadastrar"/>
        </form>
        <p>Já tem conta? <LinkNavigation to="/" text="Entrar"/></p>
      </div>
    </div>
  );
}

export default Register;
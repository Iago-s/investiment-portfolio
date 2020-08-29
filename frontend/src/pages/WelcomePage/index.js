import React from 'react';

import './styles.css';

import finance from '../../assets/finance.svg';

import Logo from '../../components/Logo';
import Button from '../../components/Button';
import LinkNavigation from '../../components/LinkNavigation';
import Input from '../../components/Input';

const WelcomePage = () => {
  return(
    <div className="container">
      <div className="img-container">
        <img src={finance} alt=""/>
      </div>
      <div className="form-container">
        <Logo />
        <form >
          <p>Email</p>
          <Input type="email" />
          <p>Senha</p>
          <Input 
            type="password"
          />
          <Button text="Entrar" />
        </form>
        <p className="register">Novo no site? <LinkNavigation to="/register" text="Cadastre-se"/></p>
      </div>
    </div>
  );
}

export default WelcomePage;
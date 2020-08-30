import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import finance from '../../assets/finance.svg';

import Logo from '../../components/Logo';
import Button from '../../components/Button';
import LinkNavigation from '../../components/LinkNavigation';
import Input from '../../components/Input';

const WelcomePage = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    const data = { email, password };

    const response = await api.post('http://localhost:3333/', data);

    if(response.data.error) {
      setEmail('');
      setPassword('');

      return alert('Usuario ou senha errado, tente novamente');
    }

    history.push('/portfolio', response.data.user);
  }
  return(
    <div className="container">
      <div className="img-container">
        <img src={finance} alt=""/>
      </div>
      <div className="form-container">
        <Logo />
        <form onSubmit={handleLogin}>
          <p>Email</p>
          <Input 
            type="email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <p>Senha</p>
          <Input 
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button text="Entrar" />
        </form>
        <p className="register">Novo no site? <LinkNavigation to="/cadastrar" text="Cadastre-se"/></p>
      </div>
    </div>
  );
}

export default WelcomePage;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import Input from '../../components/Input';
import Button from '../../components/Button';
import LinkNavigation from '../../components/LinkNavigation';

const Register = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister(e) {
    e.preventDefault();

    const data = { email, password };

    const response = await api.post('http://localhost:3333/cadastrar', data);

    if(response.data.error) {
      setEmail('');
      setPassword('');

      return alert('Ja existe um usuario cadastrado com este email.')
    }

    alert('Cadastro Realizado!');

    history.push('/');
  }

  return(
    <div className="container-register">
      <div className="form-container-register">
        <form onSubmit={handleRegister}>
          <h1>Criar conta</h1>
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
          <Button text="Cadastrar"/>
        </form>
        <p>Já tem conta? <LinkNavigation to="/" text="Entrar"/></p>
      </div>
    </div>
  );
}

export default Register;
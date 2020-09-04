import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LinkNavigation from '../../components/LinkNavigation';

import './styles.css';

import api from '../../services/api';

const Profile = (user) => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      if(user.location.state === undefined) {
        return history.push('/');
      }
      
      setEmail(user.location.state.email);
      setPassword(user.location.state.password);
    };
    fetchData();
  }, []);

  async function handleUpdateAccount(e) {
    e.preventDefault();

    const data = {
      email, 
      password, 
      user_id: user.location.state.id,
    };

    const response = await api.post('http://localhost:3333/atualizar-conta/', data);
    
    if(response.data.error) {
      alert('Não foi possivel atualizar os seus dados');
    }

    setEmail(response.data.email);
    setPassword(response.data.password);

    alert('Dados atualizados com sucesso!');

    return history.push('/'); 
  }

  async function handleDeleteAccount(e) {
    e.preventDefault();

    const response = await api.delete(`http://localhost:3333/apagar-conta/${user.location.state.id}`);

    if(response.data.error) {
      return alert('Error ao deletar conta, tente novamente mais tarde');
    }

    alert('Conta apagada com sucesso! Sentimos muito por sua partida :(');

    return history.push('/');
  }

  async function handleSendMessage(e) {
    e.preventDefault();

    
  }

  return(
    <>
      <div className="container">
        <div className="form-container">
          <Logo />
          <form onSubmit={handleUpdateAccount}>
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
            <Button text="Atualizar dados" />
          </form>
          <p className="register">
            <LinkNavigation to="/" text="Home"/>
              <span style={{ paddingLeft: 10, paddingRight: 10 }}>|</span>
            <a href="#" onClick={handleDeleteAccount} style={{color: "red"}}>Apagar conta</a>   
          </p>
        </div>

        <div className="form-container" style={{backgroundColor: "#E8EAF2"}}>
          <Logo/>
          <form onSubmit={handleSendMessage}>
            <p>Seu email</p>
            <Input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <p>Mensagem</p>
            <textarea
              rows={3}
              placeholder="Envie aqui sua dúvida ou melhorias a ser feita no site."
              value={message}
              onChange={e => setMessage(e.target.value)}
              
              required
            />
            <Button text="Enviar mensagem" />
          </form>
        </div>
      </div>

      <footer>
        <p>Desenvolvido por
            <a href="https://github.com/iago-s" target="_blank" color="red">
              Iago-s
            </a>
        </p>
      </footer>
    </>
  );
}

export default Profile;
import React, { useState, useEffect } from 'react';

import './styles.css';

import { RiAccountBoxFill } from 'react-icons/ri';
import { ImExit } from 'react-icons/im';
import ButtonAddRemove from '../../components/ButtonAddRemove';

import api from '../../services/api';

const Wallet = (user) => {
  const styleIcons = {
    color: "#F5F5F5",
  }
  
  const user_id = user.location.state.id;

  const [updatePage, setUpdatePage] = useState(0); 

  const [actives, setActives] = useState([]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState('');
  const [patrimonyHere, setPatrimonyHere] = useState(0);
  const [percentageGoal, setPercentageGoal] = useState('');
  const [currentPercentage, setCurrentPercentage] = useState(0);

  const [patrimony, setPatrimony] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`http://localhost:3333/actives/${user_id}`);

      setPatrimony(response.data.patrimony);
      setActives(response.data.actives);
    }
    
    fetchData();
  }, [updatePage]);

  async function handleAddActive(e) {
    e.preventDefault();

    if(name === '' || percentageGoal === '') {
      return alert('Preencha o codigo, quantidade, e objetivo percentual do ativo.');
    }

    //Pegar preço ativo
    const response = await api.post('http://localhost:3333/carteira', { name });

    if(response.data.error) {
      setName('');
      setPrice(0);
      setAmount(0);
      setPatrimonyHere(0);
      setPercentageGoal('');
      setCurrentPercentage(0);

      return alert('Digite um codigo de ativo valido.');
    }

    console.log(currentPercentage);

    const data = {
      name: name,
      price: response.data.price,
      amount: eval(`${amount} + 0`),
      patrimonyHere: response.data.price * amount,
      percentageGoal: eval(`${percentageGoal} + 0`),
      currentPercentage,
    }

    setName('');
    setPrice(0);
    setAmount(0);
    setPatrimonyHere(0);
    setPercentageGoal('');
    setCurrentPercentage(0);

    await api.post(`http://localhost:3333/addActive/${user_id}`, data);

    setUpdatePage(updatePage + 1);

    return alert('Ativo adicionado');
  };

  async function handleUpdateActive({ name, price, amount, patrimonyHere, percentageGoal, currentPercentage, active_id }) {
    const data = {
      name, 
      price, 
      amount, 
      patrimonyHere, 
      percentageGoal, 
      currentPercentage, 
      active_id
    };

    const response = await api.post('http://localhost:3333/atualizar-ativo/', data);

    setUpdatePage(updatePage + 1);
  }

  return(
    <div className="container-wallet">
      <div className="header-container-wallet">
        <header>
          <button className="icons"><RiAccountBoxFill style={styleIcons} size={30}/></button>
          <button className="icons"><ImExit style={styleIcons} size={30}/></button>
        </header>
      </div>
      
      <div className="container-rebalance">
        <div className="container-actives">
          <input 
            className="input-active"
            placeholder="Código"
            required
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <input 
            className="input-active"
            placeholder="Preço"
            value={price}
            readOnly={true}
          />
          <input 
            className="input-active"
            placeholder="Quantidade"
            type="number"
            required
            onChange={event => setAmount(event.target.value)}
          />
          <input 
            className="input-active"
            placeholder="Total R$"
            value={patrimonyHere}
            readOnly={true}
          />
          <input 
            className="input-active"
            placeholder="Objetivo"
            type="number"
            required
            value={percentageGoal}
            onChange={event => setPercentageGoal(event.target.value)}
          />
          <input 
            className="input-active"
            placeholder="Total %"
            value={currentPercentage}
            readOnly={true}
          />
          <ButtonAddRemove 
            text="Adicionar"
            onClick={handleAddActive}
          />
        </div>
      </div>
      
      <div className="container-spreadsheet">
        <div className="container-actives">
          <p>Patrimonio</p>
          <input 
            className="input-spreadsheet"
            readOnly={true}
            value={(patrimony).toFixed(2)}
          />
          <p>Caixa</p>
          <input 
            className="input-spreadsheet"
          />
        </div>
      </div>
      {
        actives.map((value, index) => {
          return(
            <div key={index} className="container-map-actives">
              <div className="map-actives" key={index}>
                <input 
                  className="input-active"
                  placeholder="Código"
                  value={value.name}
                  readOnly={true}
                />
                <input 
                  className="input-active"
                  placeholder="Preço"
                  value={value.price}
                  readOnly={true}
                />
                <input 
                  className="input-active"
                  placeholder="Quantidade"
                  defaultValue={value.amount}
                  onChange={event => {
                    value.amount = event.target.value;

                    value.patrimonyHere = value.price * value.amount;
                    console.log('patrimony', patrimony)                    ;
                    value.currentPercentage = (value.patrimonyHere * 100) / patrimony;

                    const data = { 
                      name: value.name,
                      price: value.price,
                      amount: value.amount,
                      patrimonyHere: value.patrimonyHere,
                      percentageGoal: value.percentageGoal,
                      currentPercentage: value.currentPercentage,
                      active_id: value.id,
                    };

                    handleUpdateActive(data);
                  }}
                />
                <input 
                  className="input-active"
                  placeholder="Total R$"
                  value={value.patrimonyHere}
                  readOnly={true}
                />
                <input 
                  className="input-active"
                  placeholder="Objetivo"
                  value={value.percentageGoal}
                />
                <input 
                  className="input-active"
                  placeholder="Total %"
                  value={(value.currentPercentage = (value.patrimonyHere * 100) / patrimony).toFixed(2)}
                  readOnly={true}
                />
                <ButtonAddRemove 
                  text="Apagar" 
                  color="red" 
                  onClick={async () => {
                    await api.delete(`http://localhost:3333/apagar-ativo/${value.id}`);

                    setUpdatePage(updatePage + 1);
                  }}
                />
              </div>
            </div>
          );
          
        })
      }
    </div>
  );
};

export default Wallet;
import React, { useState, useEffect } from 'react';

import './styles.css';

import { RiAccountBoxFill } from 'react-icons/ri';
import { ImExit } from 'react-icons/im';
import ButtonAddRemove from '../../components/ButtonAddRemove';

import api from '../../services/api';

const Wallet = (user) => {
  const user_id = user.location.state.id;

  const styleIcons = {
    color: "#F5F5F5",
  }

  const [actives, setActives] = useState([]);

  const [cash, setCash] = useState(0);
  const [patrimony, setPatrimony] = useState(0);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState('');
  const [patrimonyHere, setPatrimonyHere] = useState(0);
  const [percentageGoal, setPercentageGoal] = useState('');
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(async () => {
    const response = await api.get(`http://localhost:3333/actives/${user_id}`);
    console.log(response);
    setActives(response.data);
  }, [actives.amount]);

  async function handleAddActive(e) {
    e.preventDefault();

    if(name === '' || percentageGoal === '') {
      return alert('Preencha os três campos.');
    }

    console.log('Name: ',name, 'Price: ', price,
      'Amount: ', amount,'PatrimonyHere: ', patrimonyHere, 
      'PercentageGoal: ', percentageGoal, 
      'CurrentPercentage: ', currentPercentage
    );
    console.log('antes do parseInt',typeof amount, typeof percentageGoal);

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

    console.log(response.data.price);

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

    return alert('Ativo adicionado');
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
            value={patrimony}
          />
          <p>Caixa</p>
          <input 
            className="input-spreadsheet"
            value={cash}
            onChange={e => setCash(e.target.value)}
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
                    value.amount = event.target.value

                    console.log('amount:', value.amount, 'price:', value.price, 'patrimonyHere', value.patrimonyHere);
                    value.patrimonyHere = value.price * value.amount;
                    console.log('patrimonyHere', value.patrimonyHere);
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
                  value={value.currentPercentage}
                  readOnly={true}
                />
                <ButtonAddRemove text="Apagar" color="red"/>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default Wallet;
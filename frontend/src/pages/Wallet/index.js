import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import { RiAccountBoxFill } from 'react-icons/ri';
import { ImExit } from 'react-icons/im';

import ButtonAddRemove from '../../components/ButtonAddRemove';
import InputsSpreadsheet from '../../components/InputsSpreadsheet';

import api from '../../services/api';

const Wallet = (user) => {
  const styleIcons = {
    color: "#F5F5F5",
  }

  const history = useHistory();

  const user_id = user.location.state;

  const [updatePage, setUpdatePage] = useState(0); 

  const [actives, setActives] = useState([]);

  const nameRF = "RF";
  const [priceRF, setPriceRF] = useState('');
  const [percentageGoalRF, setPercentageGoalRF] = useState('');

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState('');
  const [patrimonyHere, setPatrimonyHere] = useState(0);
  const [percentageGoal, setPercentageGoal] = useState('');
  const [currentPercentage, setCurrentPercentage] = useState(0);

  const [patrimony, setPatrimony] = useState(0);
  const [totalPercentageGoal, setTotalPercentageGoal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if(user_id === undefined) {
        alert('Faça login para acessar sua planilha de investimentos.');

        return history.push('/');
      }

      const response = await api.get(`http://localhost:3333/actives/${user_id.id}`);

      console.log(response);

      setPatrimony(response.data.patrimony);
      setTotalPercentageGoal(response.data.percentageGoalTotal);
      setActives(response.data.actives);
    }
    
    fetchData();
  }, [updatePage, user_id, history]);

  async function handleAddActive(e) {
    e.preventDefault();

    if(name === '' || percentageGoal === '') {
      return alert('Preencha o codigo, quantidade, e objetivo percentual do ativo.');
    }

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

    await api.post(`http://localhost:3333/addActive/${user_id.id}`, data);

    setUpdatePage(updatePage + 1);

    return alert('Ativo adicionado');
  };

  async function handleAddRF(e) {
    e.preventDefault();

    if(priceRF === '' || percentageGoalRF === '') {
      return alert('Preencha o total aplicado R$ e objetivo percentual em renda fixa.');
    }

    const data = {
      name: nameRF,
      price: eval(`${priceRF} + 0`),
      amount: 0,
      patrimonyHere: eval(`${priceRF} + 0`),
      percentageGoal: eval(`${percentageGoalRF} + 0`),
      currentPercentage,
    }

    setPriceRF('');
    setPercentageGoalRF('');
    
    await api.post(`http://localhost:3333/addActive/${user_id.id}`, data);

    setUpdatePage(updatePage + 1);

    return alert('Ativo adicionado');
  }

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

    await api.post('http://localhost:3333/atualizar-ativo/', data);

    setUpdatePage(updatePage + 1);
  }

  function handleLogout(e) {
    e.preventDefault();

    history.push('/');
  }


  return(
    <div className="container-wallet">
      <div className="header-container-wallet">
        <header>
          <button className="icons" onClick={() => history.push('/perfil', user_id)}><RiAccountBoxFill style={styleIcons} size={30}/></button>
          <button className="icons" onClick={handleLogout}><ImExit style={styleIcons} size={30}/></button>
        </header>
      </div>

      <div className="container-rebalance">
        <div className="container-actives">
          <InputsSpreadsheet 
            id="ativo"
            placeholder="Código"
            required={true}
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <InputsSpreadsheet 
            placeholder="Preço"
            value={price}
            readOnly={true}
          />
          <InputsSpreadsheet 
            placeholder="Quantidade"
            type="number"
            required
            onChange={event => setAmount(event.target.value)}
          />
          <InputsSpreadsheet 
            placeholder="Total R$"
            value={patrimonyHere}
            readOnly={true}
          />
          <InputsSpreadsheet 
            placeholder="Objetivo"
            type="number"
            required
            value={percentageGoal}
            onChange={event => setPercentageGoal(event.target.value)}
          />
          <InputsSpreadsheet 
            placeholder="Total %"
            value={currentPercentage}
            readOnly={true}
          />
          <ButtonAddRemove 
            text="Adicionar RV"
            onClick={handleAddActive}
          />
        </div>
      </div>

      <div className="container-rebalance">
        <div className="container-actives">
          <InputsSpreadsheet 
            placeholder="RF"
            required={true}
            value={nameRF}
            readOnly={true}
          />
          <InputsSpreadsheet 
            placeholder="Total aplicado R$"
            value={priceRF}
            onChange={event => setPriceRF(event.target.value)}
          />
          <InputsSpreadsheet 
            placeholder="Quantidade"
            type="number"
            required
            readOnly={true}
          />
          <InputsSpreadsheet 
            placeholder="Total R$"
            value={patrimonyHere}
            readOnly={true}
          />
          <InputsSpreadsheet 
            placeholder="Objetivo"
            type="number"
            required
            value={percentageGoalRF}
            onChange={event => setPercentageGoalRF(event.target.value)}
          />
          <InputsSpreadsheet 
            placeholder="Total %"
            value={currentPercentage}
            readOnly={true}
          />
          <ButtonAddRemove 
            text="Adicionar RF"
            onClick={handleAddRF}
          />
        </div>
      </div>
      
      <div className="container-spreadsheet">
        <div className="container-actives">
          <p>Patrimônio</p>
          <InputsSpreadsheet 
            id="patrimony"
            className="input-spreadsheet"
            readOnly={true}
            value={
              Intl.NumberFormat('PT-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format((patrimony).toFixed(2))
            }
          />
        </div>
      </div>

      <div className="container-header">
        <div className="container-header-titles">
          <p>NOME</p>
          <p>PREÇO</p>
          <p>QUANTIDADE</p>
          <p>TOTAL R$</p>
          <p>OBJETIVO %</p>
          <p>TOTAL %</p>
        </div>
      </div>

      {
        actives.map((value, index) => {
          return(
            <div key={index} className="container-map-actives">
              <div className="map-actives" key={index}>
                {
                  value.name === "RF" ? 
                    <>
                      <InputsSpreadsheet 
                        value={value.name}
                        readOnly={true}
                      />  
                      <InputsSpreadsheet
                        defaultValue={value.price}
                        onChange={event => {
                          value.price = event.target.value;
                          value.patrimonyHere = value.price;
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
                      <InputsSpreadsheet 
                        defaultValue={value.amount}
                        readOnly={true}
                      />
                      <InputsSpreadsheet 
                        value={value.patrimonyHere}
                        readOnly={true}
                      />
                      {
                        value.percentageGoal === 0 ?
                          <InputsSpreadsheet 
                            defaultValue={value.percentageGoal}
                            onChange={event => {
                              value.percentageGoal = event.target.value;

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
                            color="#FAF2AA"
                          /> :
                          <InputsSpreadsheet 
                            defaultValue={value.percentageGoal}
                            onChange={event => {
                              value.percentageGoal = event.target.value;

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
                      }
                      
                      {
                        value.currentPercentage < value.percentageGoal ?
                          <InputsSpreadsheet 
                            value={(value.currentPercentage = (value.patrimonyHere * 100) / patrimony).toFixed(2) + " %"}
                            readOnly={true}
                            color="#F79499"
                            fontColor="#F5F5F5"
                          /> :
                          <InputsSpreadsheet 
                            value={(value.currentPercentage = (value.patrimonyHere * 100) / patrimony).toFixed(2) + " %"}
                            readOnly={true}
                            color="#9AE4C3"
                            fontColor="#F5F5F5"
                          />
                      }
                      <ButtonAddRemove 
                        text="Apagar" 
                        color="red"
                        onClick={async () => {
                          await api.delete(`http://localhost:3333/apagar-ativo/${value.id}`);

                          setUpdatePage(updatePage + 1);
                        }}
                      /> 
                    </> :
                    <>
                      <InputsSpreadsheet 
                        value={value.name}
                        readOnly={true}
                      />
                      <InputsSpreadsheet
                        value={value.price}
                        readOnly={true}
                      />
                      <InputsSpreadsheet 
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
                      <InputsSpreadsheet 
                        value={value.patrimonyHere}
                        readOnly={true}
                      />
                      {
                        value.percentageGoal === 0 ?
                          <InputsSpreadsheet 
                            defaultValue={value.percentageGoal}
                            onChange={event => {
                              value.percentageGoal = event.target.value;

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
                            color="#FAF2AA"
                          /> :
                          <InputsSpreadsheet 
                            defaultValue={value.percentageGoal}
                            onChange={event => {
                              value.percentageGoal = event.target.value;

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
                      }
                      
                      {
                        value.currentPercentage < value.percentageGoal ?
                          <InputsSpreadsheet 
                            value={(value.currentPercentage = (value.patrimonyHere * 100) / patrimony).toFixed(2) + " %"}
                            readOnly={true}
                            color="#F79499"
                          /> :
                          <InputsSpreadsheet 
                            value={(value.currentPercentage = (value.patrimonyHere * 100) / patrimony).toFixed(2) + " %"}
                            readOnly={true}
                            color="#9AE4C3"
                          />      
                      }
                      <ButtonAddRemove 
                        text="Apagar" 
                        color="red"
                        onClick={async () => {
                          await api.delete(`http://localhost:3333/apagar-ativo/${value.id}`);

                          setUpdatePage(updatePage + 1);
                        }}
                      />
                    </>
              }
              </div>
            </div>
          );
        })
      }

      <div className="container-footer">
        <div className="container-footer-titles">
          <p></p>
          <p></p>
          <p></p>
          <p>
            {
              Intl.NumberFormat('PT-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(patrimony)
            }
          </p>
          {
            totalPercentageGoal <= 100 ?
              <p>{totalPercentageGoal} %</p> :
              <p style={{
                color: "red"
              }}>{totalPercentageGoal} %</p>
          }
          <p>100 %</p>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
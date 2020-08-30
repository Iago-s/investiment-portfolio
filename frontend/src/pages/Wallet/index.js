import React, { useState, useEffect } from 'react';

import { RiAccountBoxFill } from 'react-icons/ri';
import { ImExit } from 'react-icons/im';

import api from '../../services/api';

import planilha from '../../assets/planilha.svg'

import './styles.css';

const Wallet = ({ navigation }) => {
  const styleIcons = {
    color: "#F5F5F5",
  }

  const actives = [{
    name: "ABEV3",
    price: 15.99,
    amount: 2,
    patrimonyHere: 30.00,
    percentageGoal: 10,
    currentPercentage: 5,
  }, {
    name: "ABEV3",
    price: 15.99,
    amount: 2,
    patrimonyHere: 30.00,
    percentageGoal: 10,
    currentPercentage: 5,
  },];

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
          />
          <input 
            className="input-active"
            placeholder="Preço"
          />
          <input 
            className="input-active"
            placeholder="Quantidade"
          />
          <input 
            className="input-active"
            placeholder="Total R$"
          />
          <input 
            className="input-active"
            placeholder="Objetivo"
          />
          <input 
            className="input-active"
            placeholder="Total %"
          />
          <button className="add-button">Adicionar</button>
        </div>
      </div>
      
      <div className="container-spreadsheet">
        <div className="container-actives">
          <p>Patrimonio</p>
          <input 
            className="input-spreadsheet"
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
              <div className="map-actives">
                <input 
                  className="input-active"
                  placeholder="Código"
                  value={value.name}
                />
                <input 
                  className="input-active"
                  placeholder="Preço"
                  value={value.price}
                />
                <input 
                  className="input-active"
                  placeholder="Quantidade"
                  value={value.amount}
                />
                <input 
                  className="input-active"
                  placeholder="Total R$"
                  value={value.patrimonyHere}
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
                />
                <button className="add-button" style={{backgroundColor: "red"}}>Apagar</button>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default Wallet;
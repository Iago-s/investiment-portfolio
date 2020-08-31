import React from 'react';

import './styles.css';

const ButtonAddRemove = (props) => {
  return(
    <button 
      className="buttonAddRemove-component" 
      style={{backgroundColor: props.color}}
      onClick={props.onClick}
    > 
      {props.text}
    </button>
  );
};

export default ButtonAddRemove;
import React from 'react';

import './styles.css';

const Button = (props) => {
  return(
    <button 
      className="button-component"
      type="submit"
    >{props.text}</button>
  );
}

export default Button;
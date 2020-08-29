import React from 'react';

import './styles.css';

const Input = (props) => {
  return(
    <input 
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      required
    />
  );
}

export default Input;
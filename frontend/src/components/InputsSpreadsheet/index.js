import React from 'react';

import './styles.css';

const InputsSpreadsheet = (props) => {
  return(
    <input
      placeholder={props.placeholder}
      type={props.type}
      required={props.required}
      value={props.value}
      onChange={props.onChange}
      readOnly={props.readOnly}
      defaultValue={props.defaultValue}
      id={props.id}
      className="inputsSpreadsheet-component"
      style={{
        backgroundColor: props.color,
      }}
    />
  );
}

export default InputsSpreadsheet;
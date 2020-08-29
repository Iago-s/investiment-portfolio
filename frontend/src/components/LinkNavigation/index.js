import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const LinkNavigation = (props) => {
  return(
    <Link classNamae="link" to={props.to}>{props.text}</Link>
  );
}
export default LinkNavigation;
import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import pageNotFound from '../../assets/page-not-found.svg';

import Button from '../../components/Button';

const NotFound = () => {
  const history = useHistory();

  return(
    <div className="container-notFound">
      <div className="container-img">
        <img src={pageNotFound} />
      </div>
    </div>
  );
}

export default NotFound;
import React from 'react';

import './styles.css';

import pageNotFound from '../../assets/page-not-found.svg';

const NotFound = () => {
  return(
    <div className="container-notFound">
      <div className="container-img">
        <img src={pageNotFound} alt="Imagem error 404"/>
      </div>
    </div>
  );
}

export default NotFound;
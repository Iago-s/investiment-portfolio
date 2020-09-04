import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';
import Register from './pages/Register';

import Wallet from './pages/Wallet';
import Profile from './pages/Profile';

import NotFound from './pages/NotFound';

function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/cadastrar" exact component={Register} />

        <Route path="/carteira" exact component={Wallet} />
        <Route path="/perfil" exact component={Profile} />

        <Route path="/*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
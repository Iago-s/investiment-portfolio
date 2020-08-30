import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';
import Register from './pages/Register';
import Wallet from './pages/Wallet';

function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/cadastrar" component={Register} />

        <Route path="/carteira" component={Wallet} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
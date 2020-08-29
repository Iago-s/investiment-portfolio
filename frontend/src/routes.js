import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';
import Register from './pages/Register';

function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
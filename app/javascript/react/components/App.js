import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './LandingPage'

const App = (props) => {
  return(
      <BrowserRouter>
          <Switch>
              <Route path="/" component={LandingPage}/>
          </Switch>
      </BrowserRouter>
  )
};

export default App
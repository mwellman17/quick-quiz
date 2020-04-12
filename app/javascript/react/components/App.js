import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import QuizContainer from "./QuizContainer";
import Dashboard from "./Dashboard";

export default function App (props) {
  return(
      <div>
          <BrowserRouter>
              <Switch>
                  <Route path="/quizzes/:id" component={QuizContainer}/>
                  <Route exact path="/quizzes" component={Dashboard}/>
                  <Route exact path="/" component={Dashboard}/>
              </Switch>
          </BrowserRouter>
      </div>
  )
};

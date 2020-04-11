import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import QuizContainer from "./QuizContainer";
import QuizList from "./QuizList";

export default function App (props) {
  return(
      <BrowserRouter>
          <Switch>
              <Route path="/quizzes/:id" component={QuizContainer}/>
              <Route path="/quizzes" component={QuizList}/>
              <Route path="/" component={LandingPage}/>
          </Switch>
      </BrowserRouter>
  )
};

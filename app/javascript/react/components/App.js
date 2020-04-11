import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import QuizContainer from "./QuizContainer";
import QuizList from "./QuizList";

export default function App (props) {
  return(
      <div>
          <BrowserRouter>
              <Switch>
                  <Route path="/quizzes/:id" component={QuizContainer}/>
                  <Route exact path="/quizzes" component={QuizList}/>
                  <Route exact path="/" component={LandingPage}/>
              </Switch>
          </BrowserRouter>
      </div>
  )
};

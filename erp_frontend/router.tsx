import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/login'
import HomePage from './components/homepage'
import Signup from './components/signup';


const Router = () => {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </>
    )
}

export default Router;
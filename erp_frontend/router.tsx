import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AdminPage from './components/adminfolder/adminview';
import HomePage from './components/homepage';
import Login from './components/login'
import Signup from './components/signup';


const Router = () => {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={HomePage} />
            <Route path="/adminview" component={AdminPage} />
          </Switch>
        </BrowserRouter>
      </>
    );
}

export default Router;
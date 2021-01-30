import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AdminPage from './components/adminview';
import HomePage from './components/homepage';

const Router = () => {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/adminview" component={AdminPage} />
          </Switch>
        </BrowserRouter>
      </>
    );
}

export default Router;
import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import {Auth} from './Auth'

import Login from './components/login'
import SignUp from './components/signup'
import HomePage from './components/homepage'
import Signup from './components/signup'

function PrivateRoute({ children, ...rest } : {children : any, path: string}) {
  return (
    <Route {...rest} render={({ location }) => {
      return Auth.isAuthenticated()
        ? children
        : <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }} />
    }} />
  )
}


const Router = () => {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/">
              <Route exact path="/" component={HomePage} />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </>
    )
}

export default Router;
import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/login";
import HomePage from "./components/homepage";
import Signup from "./components/signup";
import EmployeeDashboard from "./components/employee/dashboard/Dashboard";
import MaterialManager from "./components/employee/materialmanagement/materialmanager";
import CreateParts from "./components/employee/materialmanagement/createpart";
import EditParts from "./components/employee/materialmanagement/editpart";

import {Auth} from './Auth'

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
          <Route exact path="/" component={HomePage} />

          <PrivateRoute path="/materialmanager">
            <Route exact path={"/"} component={MaterialManager} />
          </PrivateRoute>

          <PrivateRoute path="/dashboard">
            <Route exact path={"/"} component={EmployeeDashboard} />
          </PrivateRoute>
          
          <PrivateRoute path="/materialmanager/create">
            <Route
              exact
              path={"/"}
              component={CreateParts}
            />
          </PrivateRoute>
          
          <PrivateRoute path="/materialmanager/edit/:id">
            <Route
              exact
              path={"/"}
              component={EditParts}
            />
          </PrivateRoute>

          
        </Switch>
      </BrowserRouter>
    </>
  );
};
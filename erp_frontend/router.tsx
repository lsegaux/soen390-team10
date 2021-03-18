import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/login";
import HomePage from "./components/homepage";
import Signup from "./components/signup";
import EmployeeDashboard from "./components/dashboard/SkeletonEmployee";
import ClientDashboard from "./components/dashboard/SkeletonClient"
import MaterialManager from "./components/employee/materialmanagement/materialmanager";
import CreateParts from "./components/employee/materialmanagement/createpart";
import EditParts from "./components/employee/materialmanagement/editpart";
import { Auth } from "./Auth";

function PrivateRoute({ children, ...rest }: { children: any; path: string }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return Auth.isAuthenticated() ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          );
      }}
    />
  );
} // "/sign_in/role"



export default () => {
/*  
  const url = "http://localhost:4000";

  useEffect (()=>{
    axios({
    method: 'get',
    url: `${url}/api/v1/my_user1`,
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
  }).then(res => {
    if (res.status === 200) {
      //setRole(res.data.role);
    }
  }).catch(err => {
    console.error(err);
  });
  }, []);
*/
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />

          <PrivateRoute path="/">
            <Route exact path="/" component={HomePage} />
            <Route exact path={"/employee"} component={EmployeeDashboard} />
            <Route exact path = {"/client"} component = {ClientDashboard}/>
            <Route exact path={"/materialmanager"} component={MaterialManager}/>
            <Route exact path={"/materialmanager/create"} component={CreateParts}/>
            <Route path={"/materialmanager/edit/:id"} component={EditParts} />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </>
  );
};

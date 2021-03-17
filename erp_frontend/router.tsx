import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/login";
import HomePage from "./components/homepage";
import Signup from "./components/signup";
import EmployeeDashboard from "./components/dashboard/SkeletonEmployee";
import ClientDashboard from "./components/dashboard/SkeletonClient"
import MaterialManager from "./components/employee/materialmanagement/materialmanager";
import CreateParts from "./components/employee/materialmanagement/createpart";
import EditParts from "./components/employee/materialmanagement/editpart";
import Accounting from "./components/employee/accounting/accountingdash"
import { Auth } from "./Auth";
import Inventory from "./components/production/inventory";
import Sales from "./components/client/sales/Sales";

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
}

export default () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        
          <PrivateRoute path="/">
            <Route exact path="/inventory" component={Inventory} />
            <Route exact path="/" component={HomePage} />
            <Route exact path={"/employee"} component={EmployeeDashboard} />
            <Route exact path = {"/client"} component = {ClientDashboard}/>
            <Route exact path={"/materialmanager"} component={MaterialManager}/>
            <Route exact path={"/materialmanager/create"} component={CreateParts}/>
            <Route exact path={"/accounting"} component={Accounting}/>
            <Route path={"/materialmanager/edit/:id"} component={EditParts} />
            <Route exact path={"/sales"} component={Sales}/>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </>
  );
};

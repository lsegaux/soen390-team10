import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/login";
import HomePage from "./components/homepage";
import Signup from "./components/signup";
import EmployeeDashboard from "./components/employee/dashboard/Skeleton";
import MaterialManager from "./components/employee/materialmanagement/materialmanager";
import CreateParts from "./components/employee/materialmanagement/createpart";
import EditParts from "./components/employee/materialmanagement/editpart";
import ClientDashboard from "./components/client/dashboard/dashboard.component";
import AdminView from "./components/adminfolder/adminview";
import { Auth } from "./Auth";
import Inventory from "./components/production/inventory";

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
            <Route exact path={"/adminview"} component={AdminView} />
            <Route exact path={"/dashboard"} component={EmployeeDashboard} />
            <Route exact path={"/client"} component={ClientDashboard} />
            <Route exact path={"/materialmanager"} component={MaterialManager}/>
            <Route exact path={"/materialmanager/create"} component={CreateParts}/>
            <Route path={"/materialmanager/edit/:id"} component={EditParts} />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </>
  );
};

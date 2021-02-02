import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import HomePage from "./components/homepage";
import Signup from "./components/signup";
import EmployeeDashboard from "./components/employee/dashboard/Dashboard";
import MaterialManager from "./components/employee/materialmanagement/materialmanager";
import CreateParts from "./components/employee/materialmanagement/createpart";
import EditParts from "./components/employee/materialmanagement/editpart";
import AdminView from "./components/adminfolder/adminview"

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={HomePage} />
          <Route exact path={"/materialmanager"} component={MaterialManager} />
          <Route exact path={"/dashboard"} component={EmployeeDashboard} />
          <Route exact path={"/adminview"} component = {AdminView}/>
          <Route
            exact
            path={"/materialmanager/create"}
            component={CreateParts}
          />
          <Route
            exact
            path={"/materialmanager/edit/:id"}
            component={EditParts}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;

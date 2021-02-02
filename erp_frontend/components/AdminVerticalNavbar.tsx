import React, {useState} from "react";
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Typography, IconButton, Toolbar, Menu, AppBar, Button} from "@material-ui/core";
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MenuIcon from '@material-ui/icons/Menu';

import AdminFinancials from './adminfinancials'
import AdminPlanning from './adminplanning'
import AdminVendorsProcurement from './adminvendorsprocurement'
import AdminCustomerRelations from './admincustomerrelations'
import AdminPackaging from './adminpackaging'
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AdminUserInformation from "./adminuserinformation";

const css = `
.drawerLeft {
    width: '240px';
}
.link { 
    color: black; 
}
.menuButton{
    color: white;
}
`

const VerticalNavbar = () => {

    const [state, setState] = React.useState(true);

    const toggleDrawer = (open:boolean) => (event:any) => {
        setState(open)
    }
    

  return (
      <>
      <style>
          {css}
      </style>
        <Toolbar>
            <IconButton className = "menuButton" onClick={toggleDrawer(true)} color= "inherit" edge="start" aria-label="menu">
                <MenuIcon />
                </IconButton>
            </Toolbar>
      <Router>
        <Drawer className="drawerLeft" anchor ="left" open={state} onClose={toggleDrawer(false)}>
            <List>
            <Link to={'/adminview'} className = "link">
                <ListItem button>
                    <ListItemIcon>
                        <SupervisorAccountIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Admin"}/>
                </ListItem>
            </Link>
            <Link to={'/adminview/planning'} className = "link">
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Planning"}/>
                </ListItem>
                </Link>
                <Link to={'/adminview/vendors-procurement'} className = "link">
                <ListItem button>
                    <ListItemIcon>
                        <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Vendors/Procurement"}/>
                </ListItem>
                </Link>
                <Link to={'/adminview/customerrelations'} className = "link">
                <ListItem button>
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Customer Relations"}/>
                </ListItem>
                </Link>
                <Link to={'/adminview/packaging-transport'} className = "link">
                <ListItem button>
                    <ListItemIcon>
                        <LocalShippingIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Packaging/Transport"}/>
                </ListItem>
                </Link>
                <Link to={'/adminview/financials'} className = "link">
                <ListItem button>
                    <ListItemIcon>
                        <AccountBalanceIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Financials"}/>
                </ListItem>
                </Link>
            </List>
        </Drawer>
        <Switch>
            <Route exact path="/adminview">
                <Container>
                    <AdminUserInformation />
                </Container>
            </Route>
            <Route path="/adminview/planning">
                <Container>
                    <AdminPlanning />
                </Container>
            </Route>
            <Route exact path="/adminview/vendors-procurement">
                <Container>
                    <AdminVendorsProcurement />
                </Container>
            </Route>
            <Route exact path="/adminview/customerrelations">
                <Container>
                    <AdminCustomerRelations />
                </Container>
            </Route>
            <Route exact path="/adminview/financials-sales">
                <Container>
                    <AdminFinancials />
                </Container>
            </Route>
            <Route exact path="/adminview/packaging-transport">
                <Container>
                    <AdminPackaging />
                </Container>
            </Route>
        </Switch>
        </Router>
        </>
  );
};

export default VerticalNavbar;

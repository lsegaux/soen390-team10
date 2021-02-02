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
                <Link to={'/adminview/production'} className = "link">
                <ListItem button>
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Production"}/>
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
                    Admin Page
                </Container>
            </Route>
            <Route path="/adminview/planning">
                <Container>
                    <AdminPlanning />
                </Container>
            </Route>
            <Route exact path="/adminview/vendors-procurement">
                <Container>
                    Vendors - Procurement
                </Container>
            </Route>
            <Route exact path="/adminview/production">
                <Container>
                    Production
                </Container>
            </Route>
            <Route exact path="/adminview/financials-sales">
                <Container>
                    <AdminFinancials />
                </Container>
            </Route>
            <Route exact path="/adminview/packaging-transport">
                <Container>
                    <AdminFinancials />
                </Container>
            </Route>
        </Switch>
        </Router>
        </>
  );
};

export default VerticalNavbar;
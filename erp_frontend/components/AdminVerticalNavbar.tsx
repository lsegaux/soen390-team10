import React, {useState} from "react";
import { Pane, Button, Heading, Popover, Menu } from "evergreen-ui";
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Typography, IconButton} from "@material-ui/core";
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MenuIcon from '@material-ui/icons/Menu';

import AdminFinancials from './adminfinancials'

const css = `

.drawerLeft {
    width: '240px';
}
.link { 
    color: black; 
}
.topLeftMenuButton{
    margin-top: 1px;
    margin-right: 2px;
    position:absolute;
    top:0;
    left:0;
}
`

const VerticalNavbar = () => {
    const [open, setOpen] = useState(false);

    const handleDrawer = () => {
        setOpen(true)
    }

  return (
      <>
      <style>
          {css}
      </style>
      <IconButton className = "topLeftMenuButton" onClick={handleDrawer} color= "inherit" edge="start" aria-label="menu"></IconButton>
      <Router>
        <Drawer className="drawerLeft" variant = "persistent" anchor ="left" open={open} onClose={() => setOpen(false)}>
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
                <Link to={'/adminview/scheduling'} className = "link">
                <ListItem button>
                    <ListItemIcon>
                        <ScheduleIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Scheduling"}/>
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
                    Planning
                </Container>
            </Route>
            <Route exact path="/adminview/scheduling">
                <Container>
                    Scheduling
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
            <Route exact path="/adminview/financials">
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

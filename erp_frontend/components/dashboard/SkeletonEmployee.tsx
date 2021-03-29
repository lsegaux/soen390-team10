/**
 * Template credit: https://material-ui.com/getting-started/templates/
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MainListItems from "./listItemsEmployee";

import { Auth } from "../../Auth"
import Dashboard from "./Dashboard";
import Vendor from "../vendor/Vendor";
import Accounting from "../employee/accounting/accountingdash";
import QualityManagement from "../qualitymanagement/quality_management"
import Inventory from "../production/inventory"
import ShippingAndTransportation from "../employee/ShippingAndTransportation";
import Packaging from "../packaging/Packaging"
import Scheduling from "../employee/scheduling/Scheduling"
import Planning from "../employee/planning/Planning"

function Copyright() {
  return (
    <>
      <div>
        <p align="center">
          <img src="https://user-images.githubusercontent.com/60011793/111355331-a3049880-865d-11eb-9716-58cc795aff6a.PNG" />
        </p>
      </div>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://localhost:4000/">
          Adrenaline
    </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

/*
  Page index -> Page name
  0          -> Dashboard
  1          -> Vendor
  2          -> Accounting
  3          -> Quality Management
  4          -> Inventory Management
  5          -> Packaging
  6          -> Shipping/Transportation
  7          -> Scheduling
  8          -> Planning
  */
const pages = [<Dashboard key={0} />, <Vendor key={1} />, <Accounting key={2} />, 
               <QualityManagement key={3} />, <Inventory key={4} />, <Packaging key={5}/>, 
               <ShippingAndTransportation key={6} />, <Scheduling key = {7}></Scheduling>, <Planning key ={8}></Planning>];

export default function SkeletonEmployee() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {

    axios({
      method: 'get',
      url: `http://localhost:4000/api/v1/my_user1`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
    }).then(res2 => {
      if (res2.status === 200) {
        localStorage.setItem("email", res2.data.email);
        localStorage.setItem("role", res2.data.role);
      }
    }).catch(err2 => {
      console.error(err2);
    });
  }, [])


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard - Employee
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={() => { Auth.logout() }}>
            <Typography>Logout</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems setCurrentPage={setCurrentPage} />
        </List>

      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {pages.map((item, i) => {
            if (currentPage == i) return item
          })}
        </Container>
        <Box pt='4'><Copyright /></Box>
      </main>
    </div>
  );
}

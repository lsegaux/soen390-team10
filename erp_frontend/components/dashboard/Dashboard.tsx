/**
 * Template credit: https://material-ui.com/getting-started/templates/
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();

  return (
    
    <div className={classes.root}>
      <h1>
        Welcome to the {props.userType} dashboard of:
      </h1>
    </div>
  );
}

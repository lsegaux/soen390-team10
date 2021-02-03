import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Navbar from '../header/navbar.component'
import Footer from '../footer/footer.component'
import ItemList from '../dashboard/list'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: '#aed581',
      margin: theme.spacing(2),
      maxHeight: '350px',
      overflow: 'hidden',
    },
    header: {
        textAlign: 'left',
        margin: '0px 0px 10px 0px',

    },
  }),
);

const ClientDashboard = () => {
    const classes = useStyles();
    const upcomingEvents = [{primary: 'Meeting', secondary: 'Time: 1:00pm-2:00pm'},{primary: 'Delivery', secondary: 'Time: 10:00am'}]
    const pinnedTasks = [{primary: 'Prepare Order', secondary: 'Wednesday'},{primary: 'Prepare Presentation', secondary: 'Due Thursday'},{primary: 'Build a Bike', secondary: 'Due Friday'}]
    const recentlyOpened = [{primary: 'Scheduling', secondary: '2mins ago'},{primary: 'Accounting', secondary: 'Yesterday'},{primary: 'Shipping', secondary: '2 days ago'}]

    return (
        <>
            <Navbar />
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper elevation={3} className={classes.paper} >
                        <h3 className={classes.header}>Upcoming Events</h3>
                        <ItemList list={upcomingEvents}/>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={3} className={classes.paper}>
                        <h3 className={classes.header}>Pinned Tasks</h3>
                        <ItemList list={pinnedTasks}/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper}>
                        <h3 className={classes.header}>Recently Opened</h3>
                        <ItemList list={recentlyOpened}/>
                    </Paper>
                </Grid>
            </Grid>
            </div>
            <Footer />
        </>
    )
}

export default ClientDashboard;

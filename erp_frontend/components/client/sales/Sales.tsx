import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Auth } from "../../../Auth"
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Title from "../../employee/dashboard/Title";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sales: {
            flexGrow: 1,
        },
        menuButtonSales: {
            marginRight: theme.spacing(2),
        },
        titleSales: {
            flexGrow: 1,
        },
        paperSales: {
            padding: theme.spacing(2),
            display: "flex",
            overflow: "auto",
            flexDirection: "column",
        },
        contentSales: {
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
        },
        containerSales: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        quantityBikeSales: {
            float: 'right',
        }
    }),
);

export default function Sales() {

    let wheels = {
        type: 'Wheels',
        material: ['carbon', 'aluminum']
    }

    let handlebars = {
        type: 'Handlebars',
        material: ['carbon', 'aluminum', 'alloy', 'steel']
    }

    let brakes = {
        type: 'Handlebar',
        material: ['carbon', 'aluminum', 'alloy', 'steel']
    }

    let tires = {
        type: 'Tires',
        material: ['Summer', 'Winter']
    }

    let seats = {
        type: 'Seats',
        material: ['Cloth', 'Leather']
    }

    let frames = {
        type: 'Frames',
        material: ['carbon', 'aluminum', 'alloy', 'steel']
    }

    let forks = {
        type: 'Forks',
        material: ['carbon', 'aluminum', 'alloy', 'steel']
    }

    let pedals = {
        type: 'Pedals',
        material: ['plastic road bike petals', 'aluminum road bike petals', 'plastic mountain bike petals', 'aluminum mountain bike petals']
    }


    let bikeParts = [wheels, handlebars, brakes, tires, seats, frames, forks, pedals];
    const [bikePartsArr, setBikePartsArr] = useState(bikeParts);

    const classes = useStyles();

    return (
        <div className={classes.sales}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButtonSales} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.titleSales}>
                        Sales
          </Typography>
                    <IconButton color="inherit" onClick={() => { Auth.logout() }}>
                        <Typography>Logout</Typography>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main className={classes.contentSales}>
                <Container maxWidth="lg" className={classes.containerSales}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paperSales}>
                                <Title>Build a bike</Title>
                                <br></br>
                                <Typography>Please select type of material for each category.</Typography>
                                <br></br>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Category</TableCell>
                                            <TableCell colSpan={4}>Material/Type</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bikePartsArr.map((bike) => (
                                            <TableRow key={bike.type}>
                                                <TableCell>{bike.type}</TableCell>
                                                {bike.material.map((material) => (
                                                    <TableCell key={bike.type + material}>
                                                        <FormControlLabel value="end" control={<Radio color="primary" />} label={material} />
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <br></br>
                                <Box display="flex" flexDirection="row-reverse">
                                    <Button variant="contained" color="primary" href="#contained-buttons">
                                        Order
                                    </Button>
                                    <TextField id="filled-basic" label="Enter quantity of bikes" variant="filled" />
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div >
    );
}

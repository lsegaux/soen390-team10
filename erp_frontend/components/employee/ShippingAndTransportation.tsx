import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Title from "./dashboard/Title";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        shipping: {
            display: "flex",
        },
        menuButtonShipping: {
            marginRight: theme.spacing(2),
        },
        titleShipping: {
            flexGrow: 1,
        },
        paperShipping: {
            padding: theme.spacing(2),
            display: "flex",
            // overflow: "auto",
            flexDirection: "column",
        },
        contentShipping: {
            flexGrow: 1,
            height: "100%",
            overflow: "auto",
        },
        containerShipping: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
    }),
);

export default function ShippingAndTransportation() {
    const emptyOrders = [{
        id: '',
        name: '',
        price: 0,
        nbOfBikes: 0
    }]
    const [orderArr, setOrderArr] = useState(emptyOrders);


    useEffect(() => {
        console.log("here")
        setOrderArr([{
            id: '5af',
            name: 'hey',
            price: 500,
            nbOfBikes: 10
        }])
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.shipping}>
            <main className={classes.contentShipping}>
                <Container maxWidth="lg" className={classes.containerShipping}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paperShipping}>
                                <Title>
                                    Received
                                <br></br>
                                </Title>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Order ID</TableCell>
                                            <TableCell>Client Name</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Number of Bikes</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderArr.map((order, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>{order.id}</TableCell>
                                                    <TableCell>{order.name}</TableCell>
                                                    <TableCell>{order.price}$</TableCell>
                                                    <TableCell>{order.nbOfBikes}</TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                    <TableBody>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paperShipping}>
                                <Title>
                                    In Transit
                                <br></br>
                                </Title>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Order ID</TableCell>
                                            <TableCell>Client Name</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Number of Bikes</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderArr.map((order, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>{order.id}</TableCell>
                                                    <TableCell>{order.name}</TableCell>
                                                    <TableCell>{order.price}$</TableCell>
                                                    <TableCell>{order.nbOfBikes}</TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                    <TableBody>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paperShipping}>
                                <Title>
                                    Delivered
                                <br></br>
                                </Title>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Order ID</TableCell>
                                            <TableCell>Client Name</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Number of Bikes</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderArr.map((order, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>{order.id}</TableCell>
                                                    <TableCell>{order.name}</TableCell>
                                                    <TableCell>{order.price}$</TableCell>
                                                    <TableCell>{order.nbOfBikes}</TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                    <TableBody>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div >
    )
}
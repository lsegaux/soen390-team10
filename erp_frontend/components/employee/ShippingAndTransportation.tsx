import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Title from "../dashboard/Title";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";

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
        orderWidth: {
            width: "20%"
        },
        emailWidth: {
            width: "40%"
        },
        priceWidth: {
            width: "20%"
        },
        bikeAmountWidth: {
            width: "20%"
        }
    }),
);

export default function ShippingAndTransportation() {

    const [orderArr, setOrderArr] = useState(Array());
    const url = 'http://localhost:4000';

    useEffect(() => {
        axios({
            method: 'get',
            url: `${url}/api/v1/accounting/ledger`,
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            if (res.status === 200) {
                console.log(res.data.data)
                var rows = Array();
                for (var i = 0; i < res.data.data.length; i++) {
                    rows.push(res.data.data[i]);
                }
                setOrderArr(rows);
            }
        }).catch(err => {
            console.error(err);
        });

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
                                            <TableCell className={classes.orderWidth}>Order ID</TableCell>
                                            <TableCell className={classes.emailWidth}>Client Name</TableCell>
                                            <TableCell className={classes.priceWidth}>Price</TableCell>
                                            <TableCell className={classes.bikeAmountWidth}>Number of Bikes</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderArr.map((order, index) => {
                                            if (order.status == 0) {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell className={classes.orderWidth}>{order.id}</TableCell>
                                                        <TableCell className={classes.emailWidth}>{order.userEmail}</TableCell>
                                                        <TableCell className={classes.priceWidth}>{order.price}$</TableCell>
                                                        <TableCell className={classes.bikeAmountWidth}>{order.bikesAmount}</TableCell>
                                                    </TableRow>)
                                            }
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
                                    Packaged
                                <br></br>
                                </Title>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.orderWidth}>Order ID</TableCell>
                                            <TableCell className={classes.emailWidth}>Client Name</TableCell>
                                            <TableCell className={classes.priceWidth}>Price</TableCell>
                                            <TableCell className={classes.bikeAmountWidth}>Number of Bikes</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderArr.map((order, index) => {
                                            if (order.status == 1) {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell className={classes.orderWidth}>{order.id}</TableCell>
                                                        <TableCell className={classes.emailWidth}>{order.userEmail}</TableCell>
                                                        <TableCell className={classes.priceWidth}>{order.price}$</TableCell>
                                                        <TableCell className={classes.bikeAmountWidth}>{order.bikesAmount}</TableCell>
                                                    </TableRow>)
                                            }
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
                                            <TableCell className={classes.orderWidth}>Order ID</TableCell>
                                            <TableCell className={classes.emailWidth}>Client Name</TableCell>
                                            <TableCell className={classes.priceWidth}>Price</TableCell>
                                            <TableCell className={classes.bikeAmountWidth}>Number of Bikes</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderArr.map((order, index) => {
                                            if (order.status == 2) {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell className={classes.orderWidth}>{order.id}</TableCell>
                                                        <TableCell className={classes.emailWidth}>{order.userEmail}</TableCell>
                                                        <TableCell className={classes.priceWidth}>{order.price}$</TableCell>
                                                        <TableCell className={classes.bikeAmountWidth}>{order.bikesAmount}</TableCell>
                                                    </TableRow>)
                                            }
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
                                            <TableCell className={classes.orderWidth}>Order ID</TableCell>
                                            <TableCell className={classes.emailWidth}>Client Name</TableCell>
                                            <TableCell className={classes.priceWidth}>Price</TableCell>
                                            <TableCell className={classes.bikeAmountWidth}>Number of Bikes</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderArr.map((order, index) => {
                                            if (order.status == 3) {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell className={classes.orderWidth}>{order.id}</TableCell>
                                                        <TableCell className={classes.emailWidth}>{order.userEmail}</TableCell>
                                                        <TableCell className={classes.priceWidth}>{order.price}$</TableCell>
                                                        <TableCell className={classes.bikeAmountWidth}>{order.bikesAmount}</TableCell>
                                                    </TableRow>)
                                            }
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
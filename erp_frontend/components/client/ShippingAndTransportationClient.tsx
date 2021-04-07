import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Dialog, DialogContent, DialogTitle} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        shippingClient: {
            display: "flex",
        },
        menuButtonShippingClient: {
            marginRight: theme.spacing(2),
        },
        paperShippingClient: {
            padding: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
        },
        contentShippingClient: {
            flexGrow: 1,
            height: "100%",
            overflow: "auto",
        },
        containerShippingClient: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        rootShippingClient: {
            '& > *': {
                margin: theme.spacing(1),
                width: '80ch',
            },
        },
        titleShippingClient: {
            flexGrow: 1,
            textAlign: 'center'
        }
    }),
);

export default function ShippingAndTransportationClient() {

    const orderStatusReference = {
        0: 'Created',
        1: 'Packaged',
        2: 'Shipped',
        3: 'Delivered'
    }

    const [orderId, setOrderId] = useState('');
    const [openOrder, setOpenOrder] = useState(false);
    const [orderArr, setOrderArr] = useState(Array());
    const [orderDetail, setOrderDetail] = useState(Object());
    const url = 'http://localhost:4000';

    const handleOpen = () => {
        setOpenOrder(true);
    };

    const handleClose = () => {
        setOpenOrder(false);
    };

    const handleRequest = () => {
        axios({
            method: 'get',
            url: `${url}/api/v1/accounting/order/${orderId}`,
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            if (res.status === 200) {
                setOrderDetail(res.data.data);
                handleOpen()
            } else {
                alert('Package details not found for current user.');
            }
        }).catch(err => {
            console.error(err);
            alert('Package details not found for current user.');
        });
    }

    const classes = useStyles();

    return (
        <div className={classes.shippingClient}>
            <main className={classes.contentShippingClient}>
                <Container maxWidth="lg" className={classes.containerShippingClient}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paperShippingClient}>
                                <Typography component="h2" variant="h6" color="primary" className={classes.titleShippingClient}>
                                    Order Shipping Detail
                                <br></br>
                                </Typography>
                                <form align="center" className={classes.rootShippingClient} noValidate autoComplete="off">
                                    <TextField id="filled-basic" label="Enter order ID" variant="filled" onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setOrderId(e.target.value)} />
                                    <Button variant="contained" color="primary" href="#contained-buttons" onClick={handleRequest} >
                                        View Order
                                </Button>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Dialog open={openOrder} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Payment Information</DialogTitle>
                        <DialogContent>
                            <Typography gutterBottom>
                                {'Order ID: ' + orderDetail.id}
                            </Typography>
                            <Typography gutterBottom>
                                {'Email: ' + orderDetail.userEmail}
                            </Typography>
                            <Typography gutterBottom>
                                {'Price: ' + orderDetail.price + '$'}
                            </Typography>
                            <Typography gutterBottom>
                                {'Number of Bikes: ' + orderDetail.bikesAmount}
                            </Typography>
                            <Typography gutterBottom>
                                {'Order status: ' + orderStatusReference[orderDetail.status]}
                            </Typography>
                        </DialogContent>

                    </Dialog>
                </Container>
            </main>
        </div >
    )
}
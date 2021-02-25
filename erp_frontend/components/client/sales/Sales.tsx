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
import { RadioGroup, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@material-ui/core';
import axios from 'axios';

var bikeAssembled = {};

// TODO: query backend to get real info
var plants = [
    {
        plantName: "Montreal",
        parts: [
            {
                type: "Wheels",
                material: "Carbon",
                price: 200,
                quantity: 120,
            },
            {
                type: "Wheels",
                material: "Aluminium",
                price: 220,
                quantity: 80,
            },
            {
                type: "Frame",
                material: "Carbon",
                price: 85,
                quantity: 150,
            },
            {
                type: "Frame",
                material: "Aluminium",
                price: 85,
                quantity: 78,
            },
            {
                type: "Frame",
                material: "Alloy",
                price: 80,
                quantity: 65,
            },
            {
                type: "Frame",
                material: "Steel",
                price: 75,
                quantity: 90,
            },
            {
                type: "Handlebars",
                material: "Carbon",
                price: 60,
                quantity: 87,
            },
            {
                type: "Handlebars",
                material: "Aluminium",
                price: 55,
                quantity: 87,
            },
            {
                type: "Handlebars",
                material: "Alloy",
                price: 50,
                quantity: 44,
            },
            {
                type: "Handlebars",
                material: "Steel",
                price: 45,
                quantity: 67,
            },
            {
                type: "Brakes",
                material: "Carbon",
                price: 86,
                quantity: 78,
            },
            {
                type: "Brakes",
                material: "Aluminium",
                price: 87,
                quantity: 87,
            },
            {
                type: "Brakes",
                material: "Alloy",
                price: 89,
                quantity: 76,
            },
            {
                type: "Brakes",
                material: "Steel",
                price: 80,
                quantity: 28,
            },
            {
                type: "Tires",
                material: "Summer",
                price: 180,
                quantity: 80,
            },
            {
                type: "Tires",
                material: "Winter",
                price: 220,
                quantity: 87,
            },
            {
                type: "Seats",
                material: "Cloth",
                price: 45,
                quantity: 76,
            },
            {
                type: "Seats",
                material: "Leather",
                price: 60,
                quantity: 46,
            },
            {
                type: "Fork",
                material: "Steel",
                price: 85,
                quantity: 76,
            },
            {
                type: "Fork",
                material: "Carbon",
                price: 80,
                quantity: 66,
            },
            {
                type: "Fork",
                material: "Aluminium",
                price: 80,
                quantity: 60,
            },
            {
                type: "Fork",
                material: "Alloy",
                price: 75,
                quantity: 86,
            },
            {
                type: "Pedals",
                material: "Aluminum mountain bike petals",
                price: 110,
                quantity: 52,
            },
            {
                type: "Pedals",
                material: "Plastic mountain bike petals",
                price: 70,
                quantity: 47,
            },
            {
                type: "Pedals",
                material: "Aluminum road bike petals",
                price: 90,
                quantity: 91,
            },
            {
                type: "Pedals",
                material: "Plastic road bike petals",
                price: 60,
                quantity: 39,
            }
        ]
    }
    ]

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

    var parts = {
        "Wheels": [
        ],
        "Frame": [
        ],
        "Handlebars": [
        ],
        "Brakes": [
        ],
        "Tires": [
        ],
        "Seats": [
        ],
        "Fork": [
        ],
        "Pedals": [
        ]
    };

    function parseInventory() {

        for (var i = 0; i < plants.length; i++) {
            for (var j = 0; j < plants[i]["parts"].length; j++) {

                const partName = plants[i]["parts"][j]["type"];
                const materialName = plants[i]["parts"][j]["material"];
                const quantity = plants[i]["parts"][j]["quantity"]
                const price = plants[i]["parts"][j]["price"]

                if (!(materialName in parts[partName])) {
                    parts[partName][materialName] = { price: price, quantity: quantity }
                }
                else {
                    let currQuantity = parts[partName][materialName]["quantity"];
                    parts[partName][materialName]["quantity"] = quantity + currQuantity
                }
            }
        }
    }

    parseInventory()

    let wheels = {
        partName: "Wheels",
        material: ['Carbon', 'Aluminium'],
        types: parts["Wheels"]
    };

    let frames = {
        partName: "Frame",
        material: ['Carbon', 'Aluminum', 'Alloy', 'Steel'],
        types: parts["Frame"]
    };

    let handlebars = {
        partName: 'Handlebars',
        material: ['Carbon', 'Aluminium', 'Alloy', 'Steel'],
        types: parts["Handlebars"]
    }

    let brakes = {
        partName: 'Brakes',
        material: ['Carbon', 'Aluminium', 'Alloy', 'Steel'],
        types: parts["Brakes"]
    }

    let tires = {
        partName: 'Tires',
        material: ['Summer', 'Winter'],
        types: parts["Tires"]
    }

    let seats = {
        partName: 'Seats',
        material: ['Cloth', 'Leather'],
        types: parts["Seats"]
    }

    let forks = {
        partName: 'Forks',
        material: ['Carbon', 'Aluminium', 'Alloy', 'Steel'],
        types: parts["Forks"]
    }

    let pedals = {
        partName: 'Pedals',
        material: ['Plastic road bike petals', 'Aluminum road bike petals', 'Plastic mountain bike petals', 'Aluminum mountain bike petals'],
        types: parts["Pedals"]
    }

    let bikeParts = [wheels, handlebars, brakes, tires, seats, frames, forks, pedals];
    const [bikePartsArr, setBikePartsArr] = useState(bikeParts);
    const [totalPrice, setTotalPrice] = useState(0);
    const [bikeQty, setBikeQty] = useState(0);
    const [openPayment, setOpenPayment] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [expiration, setExpiration] = useState("");
    const [cardPerson, setCardPerson] = useState("");

    const classes = useStyles();

    function handleBikeQty(value: string) {
        let numBikes = parseInt(value);
        if (numBikes < 15) {
            alert("You must order at least 15 bikes");
            return;
        }
        setBikeQty(numBikes)
    }

    function buttonChange(value: string, partName: string, index: number) {
        let qty = bikeParts[index]["types"][value]["quantity"]
        let price = bikeParts[index]["types"][value]["price"];
        if (qty < bikeQty) {
            alert(`This part is out of stock (only ${qty} left).`);
            return;
        }
        setTotalPrice(totalPrice + price);

        if (!bikeAssembled[partName]) {
            bikeAssembled[partName] = { material: value, quantity: qty - bikeQty }
        }
    }

    function parseAfter() {
        axios({
            method: 'post',
            url: "http://localhost/api/v1/sale",
            headers: { "Content-Type": "application/json" },
            data: {
                price: totalPrice,
                name: cardPerson,
                quantity: bikeQty
            }
        }).then(res => {
            if (res.status === 200) {
                console.log("success");
            }
        }).catch(err => {
            console.error(err);
        });

        for (var i = 0; i < plants.length; i++) {
            for (var j = 0; j < plants[i]["parts"].length; j++) {
                for (var key in bikeAssembled) {

                    if (plants[i]["parts"][j]["type"] == key &&
                        plants[i]["parts"][j]["material"] == bikeAssembled[key]["material"]
                        && plants[i]["parts"][j]["quantity"] >= bikeQty) {

                        // Info for backend
                        let plantName = plants[i]["plantName"];
                        let partName = key;
                        let material = bikeAssembled[key]["material"];
                        console.log(plantName, partName, material);
                    }
                }
            }
        }
    }

    function validateBikeAmt() {
        if (Number.isNaN(bikeQty) || bikeQty < 15) return false;
        return true;
    }

    const handleOpen = () => {
        setOpenPayment(true);
    };

    const handleClose = () => {
        parseAfter();
        setOpenPayment(false);
    };

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
                                <TextField id="filled-basic" label="Enter quantity of bikes" variant="filled" onMouseLeave={(e: { target: { value: React.SetStateAction<string>; }; }) => handleBikeQty(e.target.value)} />
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
                                        {bikePartsArr.map((bikePart, index) => {
                                            let materialLastIndex = bikePart.material.length - 1;
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>{bikePart.partName}</TableCell>
                                                    <RadioGroup onChange={(e: { target: { value: React.SetStateAction<String>; }; }) => buttonChange(e.target.value, bikePart.partName, index)}>
                                                        {bikePart.material.map((material, indexMaterial) => (
                                                            <TableCell key={bikePart.types + material} colSpan={materialLastIndex === indexMaterial ? 40 : 1}>
                                                                <FormControlLabel value={material}
                                                                    control={<Radio color="primary" disabled={!validateBikeAmt()} />} label={material} />
                                                            </TableCell>
                                                            //     <TableCell>
                                                            //         {/* price */}
                                                            //     </TableCell>
                                                            //     <TableCell>
                                                            //     {/* quantity */}
                                                            // </TableCell>
                                                        ))}
                                                    </RadioGroup>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </Table>
                                <br></br>
                                <Box display="flex" flexDirection="row-reverse">
                                    <Button variant="contained" color="primary" href="#contained-buttons" onClick={handleOpen} >
                                        Order
                                    </Button>
                                    <Dialog open={openPayment} onClose={handleClose} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Payment Information</DialogTitle>
                                        <DialogContent>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                label="Name of cardholder"
                                                type="string"
                                                fullWidth
                                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setCardPerson(e.target.value)}
                                            />
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                label="Card Number"
                                                type="string"
                                                fullWidth
                                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setCardNumber(e.target.value)}
                                                error={cardNumber.length != 19}
                                            />
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                label="Security Code"
                                                type="string"
                                                fullWidth
                                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSecurityCode(e.target.value)}
                                                error={securityCode.length != 3}
                                            />
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                label="Expiration Date"
                                                type="string"
                                                fullWidth
                                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setExpiration(e.target.value)}
                                                error={expiration.match("[0-9][0-9]\/[0-9][0-9]") == null}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} color="primary">
                                                Cancel
                                        </Button>
                                            <Button onClick={handleClose} color="primary">
                                                Proceed to Payment
                                        </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Box>
                                <Title>Total: {totalPrice}$ </Title>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}
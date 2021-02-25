import React, { useState, useEffect } from 'react';
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

var bikeAssembled={};

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
    let bikeParts = [wheels, handlebars, brakes, tires, seats, frames, forks, pedals];
    const [bikePartsArr, setBikePartsArr] = useState(bikeParts);
    const [totalPrice, setTotalPrice] = useState(0);
    const [bikeQty, setBikeQty] = useState(0);
    const [openPayment, setOpenPayment] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [expiration, setExpiration] = useState("");
    const [plants, setPlants] = useState<any>([]);
    const [inventory, setInventory] = useState<any>({});
    //const [ready, setReady] = useState<Boolean>(false)

    useEffect(() => {
        axios({
            method: 'get',
            url: "http://localhost:4000/api/v1/production",
        }).then(res => {
            if (res.status === 200) {
                let plants: any[] = [];
                for (let key in res.data.productionData) {
                    if (Object.prototype.hasOwnProperty.call(res.data.productionData, key)) {
                        plants.push({...res.data.productionData[key], id: key});
                    }
                }
                setPlants(plants);
            }
        }).catch(err => {
            console.error(err);
        });
    });

    useEffect(() => {
        parseInventory();
        //setReady(true);
    }, [plants]);

    function parseInventory() {
        let result: {[k: string]: any} = {};

        plants.forEach(plant => {
            plant.parts.forEach(part => {
                if (!part.type){
                    result.type = [];
                }
                if (!part.type[part.material]){
                    result.type[part.material] = [];
                }

                result.type[part.material].push({
                    plantID: plant.id,
                    quantity: part.quantity,
                    price: part.price
                });
            });
        });

        setInventory(result);
    }

    // function parseInventory(){
    //     console.log("parsing", plants)
    //     for (var i=0; i <plants.length; i++){
    //         for (var j = 0; j < plants[i]["parts"].length; j++){

    //             const partName = plants[i]["parts"][j]["type"];
    //             const materialName = plants[i]["parts"][j]["material"];  
    //             const quantity = plants[i]["parts"][j]["quantity"]
    //             const price = plants[i]["parts"][j]["price"]

    //             if (!(materialName in parts[partName])){
    //                 parts[partName][materialName] = {price: price, quantity:quantity}
    //             }
    //             else {
    //                 let currQuantity = parts[partName][materialName]["quantity"];
    //                 parts[partName][materialName]["quantity"] = quantity + currQuantity
    //             }
    //         }
    //     }
    // }

    const classes = useStyles();

    function handleBikeQty(value: string){
        let numBikes = parseInt(value);
        if (numBikes < 15){
            alert("You must order at least 15 bikes in one order");
            return;
        }
        setBikeQty(numBikes)
    }

    function buttonChange(value: string, partName:string, index:number){
        let qty = bikeParts[index]["types"][value]["quantity"]
        let price = bikeParts[index]["types"][value]["price"];
        if (qty < bikeQty){
            alert(`This part is out of stock (only ${qty} left).`);
            return;
        }
        setTotalPrice(totalPrice + price);

        if (!bikeAssembled[partName]){
            bikeAssembled[partName] = {material: value, quantity: qty-bikeQty}
        }
    }

    function parseAfter(){
        for (var i=0; i <plants.length; i++){
            for (var j = 0; j < plants[i]["parts"].length; j++){
                for (var key in bikeAssembled){

                    if (plants[i]["parts"][j]["type"] == key &&
                    plants[i]["parts"][j]["material"] == bikeAssembled[key]["material"]
                    && plants[i]["parts"][j]["quantity"] >= bikeQty){

                        // Info for backend
                        let plantName = plants[i]["plantName"];
                        let partName = key;
                        let material = bikeAssembled[key]["material"];
                        console.log(plantName + " " + partName + " " + material + " " + bikeQty)
                    }
                }
            }
        }
    }

    function validateBikeAmt(){
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
                                <TextField id="filled-basic" label="Enter quantity of bikes" variant="filled" onMouseLeave={(e: { target: { value: React.SetStateAction<string>; }; }) => handleBikeQty(e.target.value)}/>
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
                                        {bikePartsArr.map((bikePart, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{bikePart.partName}</TableCell>
                                                {bikePart.material.map((material, price, quantity) => (
                                                    <TableCell key={bikePart.types + material}>
                                                        <RadioGroup onChange={(e: { target: { value: React.SetStateAction<String>; }; }) => buttonChange(e.target.value, bikePart.partName, index)}>
                                                        <FormControlLabel value={material} 
                                                        control={<Radio color="primary" disabled={!validateBikeAmt()}/>} label={material} />
                                                        </RadioGroup>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
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

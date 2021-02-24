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
import { RadioGroup } from '@material-ui/core';
import { Label } from 'recharts';

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

    function parseInventory(){
        // TODO: query backend to get real info
        var plants = [
            {
              plantName: "Montreal",
              parts: [
                 {
                  type: "Wheels",
                  material: "Carbon",
                  price: "200$",
                  quantity: 3,
                  }
              ]
            },
            {
                plantName: "Toronto",
                parts: [
                   {
                    type: "Wheels",
                    material: "Aluminium",
                    price: "22$",
                    "quantity": 230,
                    },
                    {
                    type: "Wheels",
                    material: "Carbon",
                    price: "200$",
                    quantity: 10,
                    }
                ]
              }
          ]

          for (var i=0; i <plants.length; i++){
              for (var j = 0; j < plants[i]["parts"].length; j++){

                  const partName = plants[i]["parts"][j]["type"];
                  const materialName = plants[i]["parts"][j]["material"];  
                  const quantity = plants[i]["parts"][j]["quantity"]
                  const price = plants[i]["parts"][j]["price"]
                  
                  if (!(materialName in parts[partName])){
                      parts[partName][materialName] = {price: price, quantity:quantity}
                  }
                  else {
                    let currQuantity = parts[partName][materialName]["quantity"];
                    parts[partName][materialName]["quantity"] = quantity + currQuantity
                  }
              }
              console.log(parts);
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
        types: parts["Hadndlebars"]
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
    const [wheelMaterial, setWheelMaterial] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [bikeQty, setBikeQty] = useState(0);

    const classes = useStyles();

    function handleBikeQty(value: string){
        let numBikes = parseInt(value);
        if (numBikes < 15){
            alert("You must order at least 15 bikes");
            return;
        }
        setBikeQty(numBikes)
    }

    function wheelButtonChange(value: string){
        let qty = wheels["types"][value]["quantity"]
        console.log(qty)
        console.log(bikeQty)
        if (qty < bikeQty){
            alert(`This part is out of stock (only ${qty} left).`);
            return;
        }
        setWheelMaterial(value);
        let price = wheels["types"][value]["price"].substring(0,wheels["types"][value]["price"].length - 1);
        setTotalPrice(parseInt(totalPrice + price));
    }

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
                                        {bikePartsArr.map((bike) => (
                                            <TableRow key={bike.partName}>
                                                <TableCell>{bike.partName}</TableCell>
                                                {bike.material.map((material) => (
                                                    <TableCell key={bike.types + material}>
                                                        <RadioGroup onChange={(e: { target: { value: React.SetStateAction<String>; }; }) => wheelButtonChange(e.target.value)}>
                                                        <FormControlLabel value={material} control={<Radio color="primary" />} label={material} />
                                                        </RadioGroup>
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
                                </Box>
                                <Title>Total: {totalPrice} </Title>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}

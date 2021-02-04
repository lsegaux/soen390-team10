import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TypeQuantityTable from "./typeQuantityTable";
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }),
);

export default function Inventory(this: any) {

    const part1 = { "type": "wheel", "quantity": 12 }
    const part2 = { "type": "handlebar", "quantity": 10 }
    const material1 = { "type": "aluminium", "quantity": 90 }
    const material2 = { "type": "copper", "quantity": 21 }
    const material3 = { "type": "steel", "quantity": 220 }

    const plant1 = {
        "location": "Montreal",
        "materials": [material1, material2, material3],
        "parts": [part1, part2],
        "bikesBuilt": 4,
        "bikesBeingBuilt": 3
    }
    const plant2 = {
        "location": "Toronto",
        "materials": [material2, material1, material3],
        "parts": [part2, part1],
        "bikesBuilt": 5,
        "bikesBeingBuilt": 10
    }
    const plant3 = {
        "location": "Vancouver",
        "materials": [material3, material2, material3],
        "parts": [part1, part2],
        "bikesBuilt": 100,
        "bikesBeingBuilt": 31
    }
    const obj = { "plants": [plant1, plant2, plant3] }


    const [inventoryObj, setInventoryObj] = useState(obj['plants']);

    const url = 'http://localhost:4000';

    // TODO: update
    // useEffect(() => {
    //     axios({
    //         method: 'get',
    //         url: `${url}/api/v1/production`,
    //         headers: { "Content-Type": "application/json" },
    //     }).then(res => {
    //         if (res.status === 200) {
    //             setInventoryObj(res.data["plants"])
    //         }
    //     }).catch(err => {
    //         console.error(err);
    //     });
    // });

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {inventoryObj.map((plant) => (
                <Accordion key={plant.location}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>{plant.location}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.root}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Materials ({plant.materials.length})</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TypeQuantityTable content={plant.materials} type="materials" />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Parts ({plant.materials.length})</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TypeQuantityTable content={plant.parts} type="parts" />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    disabled={true}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Built Bikes ({plant.bikesBuilt})</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    disabled={true}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Bikes Being Built ({plant.bikesBeingBuilt})</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                </AccordionDetails>
                            </Accordion>

                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}





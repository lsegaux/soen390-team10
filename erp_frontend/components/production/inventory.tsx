import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TypeQuantityTable from "./typeQuantityTable";
import { getProductionStatus } from '../../utils/datafetcher';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        production: {
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
        },
        inventoryDiv: {
            width: '85%',
            margin: 'auto',
        },
        welcomeProduction: {
            padding: '60px',
            '& h3': {
                paddingBottom: '30px'
            },

        },
        plantsDiv: {
            width: '100%',
        },
        bikesTypography: {
            color: '#FFFFFF !important'
        },
        plantsAccordion: {
            background: '#247cd1'
        },
        mainAccordion: {
            background: '#054787'
        },
        plantHeading: {
            color: '#FFFFFF',

        },
        expand_icon: {
            color: '#FFFFFF'
        }
    }),
);

export default function Inventory(this: any) {

    const part1 = { "type": "wheel", "quantity": 12 }
    const part2 = { "type": "handlebar", "quantity": 10 }
    const material1 = { "type": "aluminium", "quantity": 90 }
    const material2 = { "type": "copper", "quantity": 21 }
    const material3 = { "type": "steel", "quantity": 220 }

    const plant1 = {
        "location": "Montreal Plant",
        "materials": [material1, material2, material3],
        "parts": [part1, part2],
        "bikesBuilt": 4,
        "bikesBeingBuilt": 3
    }
    const plant2 = {
        "location": "Dubai Plant",
        "materials": [material2, material1, material3],
        "parts": [part2, part1],
        "bikesBuilt": 5,
        "bikesBeingBuilt": 10
    }
    const plant3 = {
        "location": "Toronto Plant",
        "materials": [material3, material2, material3],
        "parts": [part1, part2],
        "bikesBuilt": 100,
        "bikesBeingBuilt": 31
    }
    const obj = { "plants": [plant1, plant2, plant3] }


    const [inventoryObj, setInventoryObj] = useState<any>(obj['plants']);

    const url = 'http://localhost:4000';

    useEffect(() => {
        getProductionStatus(res => {
            let inv: Array<any>[] = [];
            for (let key in res['productionData']) {
                if (res['productionData'].hasOwnProperty(key)) {
                    inv.push(res['productionData'][key])
                }
            }
            setInventoryObj(inv)
        });
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.production}>
            <div className={classes.welcomeProduction}>
                <Typography variant="h3" align="center">Production</Typography>
                <Typography variant="h6" align="center">Welcome to production where you can see the inventory of all the different plants. Under each plant location you can see information on the different materials, parts and bikes.</Typography>
            </div>
            <div className={classes.inventoryDiv}>
                {inventoryObj.map((plant) => (
                    <Accordion key={plant.location} className={classes.mainAccordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className={classes.expand_icon} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.plantHeading}>{plant.location}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.plantsDiv}>
                                <Accordion className={classes.plantsAccordion}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className={classes.expand_icon} />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.plantHeading}>Materials ({plant.materials.length})</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TypeQuantityTable content={plant.materials} type="materials" />
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion className={classes.plantsAccordion}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className={classes.expand_icon} />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.plantHeading}>Parts ({plant.materials.length})</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TypeQuantityTable content={plant.parts} type="parts" />
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion className={classes.plantsAccordion}>
                                    <AccordionSummary
                                        disabled={true}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.plantHeading}>Built Bikes ({plant.bikesBuilt})</Typography>
                                    </AccordionSummary>
                                </Accordion>
                                <Accordion className={classes.plantsAccordion}>
                                    <AccordionSummary
                                        disabled={true}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.plantHeading}>Bikes Being Built ({plant.bikesBeingBuilt})</Typography>
                                    </AccordionSummary>
                                </Accordion>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    );
}





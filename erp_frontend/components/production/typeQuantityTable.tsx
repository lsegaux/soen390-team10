import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

let uniqueKey = 0;

export default function TypeQuantityTable({ content, type }) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Type</TableCell>
                        {type == 'materials' ? <TableCell align="left">Quantity (kg)</TableCell> : <TableCell align="left">Quantity</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {content.map((content) => (
                        <TableRow key={++uniqueKey + content.type}>
                            <TableCell component="th" scope="row">
                                {content.type}
                            </TableCell>
                            <TableCell align="left">{content.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

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

function createData(vendorName, amountDue) {
  return { vendorName, amountDue };
}

const rows = [
  createData('Wilson Materials Company Limited.', 0),
];

export default function BasicTable() {
  const classes = useStyles();
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              Accounts Payable
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Vendor Name</TableCell>
            <TableCell align="right">Amount Due</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.vendorName}>
              <TableCell component="th" scope="row">
                {row.vendorName}
              </TableCell>
              <TableCell align="right">{row.amountDue + "$"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
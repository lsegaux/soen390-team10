import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(vendorName, amountDue) {
  return { vendorName, amountDue };
}

const rows = [
  createData('The Junkyard Materials Company Limited.', 0),
];

export default function BasicTable() {
  const classes = useStyles();


  /*
  const url = 'http://localhost:4000';
  const [data, setData] = useState([]);

  useEffect(() => {
       axios({
          method: 'post',
          url: `${url}/api/v1/EndpointHere`,
          headers: { "Content-Type": "application/json" },
       }).then(res => {
          if (res.status === 200) {
              setData(res.data["accountsReceivable"])
          }
       }).catch(err => {
          console.error(err);
      });
  });
  */

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
              <TableCell align="right">{row.amountDue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
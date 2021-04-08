import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getLedger, getVendorTransactions } from '../../../utils/datafetcher';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function BasicTable() {
  const classes = useStyles();

  const [customerData, setCustomerData] = useState(Array());
  const [vendorData, setVendorData] = useState(Array());

  useEffect(() => {

      //Fetching Customer Transactions
      getLedger(res => {
        var rows = Array();
        for (var i = 0; i < res.data.length; i++) {
            rows.push(res.data[i]);
        }
        setCustomerData(rows);
    })

      //Fetching Vendor Transactions
    getVendorTransactions(res => {
      var rows = Array();
        for(var i=0; i<res.data.length; i++){
          rows.push(res.data[i]);
        }
        setVendorData(rows);
    })

  }, []);

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              Customer Transactions
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Purchaser</TableCell>
            <TableCell>Number of Bikes</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customerData.map((row) => (
            <TableRow key={row.userEmail}>
              <TableCell component="th" scope="row">
                {row.userEmail}
              </TableCell>
              <TableCell>{row.bikesAmount}</TableCell>
              <TableCell>{row.price * row.bikesAmount + "$"}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <br></br>
        <br></br>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              Vendor Transactions
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Vendor Name</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendorData.map((row) => (
            <TableRow key={row.amount}>
              <TableCell component="th" scope="row">
              {row.company}
              </TableCell>
              <TableCell>{row.amount + "$"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
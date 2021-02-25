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


export default function BasicTable() {
  const classes = useStyles();

  const url = 'http://localhost:4000';
  const [data, setData] = useState(Array());

  useEffect(() => {
       axios({
          method: 'get',
          url: `${url}/api/v1/accounting/ledger`,
          headers: { "Content-Type": "application/json" },
       }).then(res => {
          if (res.status === 200) {
            var rows = Array();
            for(var i=0; i<res.data.data.length; i++){
              rows.push(res.data.data[i]);
            }
            setData(rows);
          }
       }).catch(err => {
          console.error(err);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              Ledger
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
          {data.map((row) => (
            <TableRow key={row.userEmail}>
              <TableCell component="th" scope="row">
                {row.userEmail}
              </TableCell>
              <TableCell>{row.bikesAmount}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
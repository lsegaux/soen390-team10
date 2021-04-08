import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getLedger } from '../../../utils/datafetcher';

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
    getLedger(res => {
      var rows = Array();
      for (var i = 0; i < res.data.length; i++) {
          rows.push(res.data[i]);
      }
      setData(rows);
  })
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              Account Receivable
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Amount Owed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.userEmail}>
              <TableCell component="th" scope="row">
                {row.userEmail}
              </TableCell>
              <TableCell>Paid</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
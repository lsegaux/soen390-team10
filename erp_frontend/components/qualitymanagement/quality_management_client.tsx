/**
 * Template credit: https://material-ui.com/getting-started/templates/
 */

import React, {useState ,useEffect} from "react";
import { makeStyles} from "@material-ui/core/styles";
import axios from "axios";

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';


import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from '@material-ui/core/TableFooter';

import DefectForm from './DefectForm';

const url = 'http://localhost:4000';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  button:{
    width:"100%",
    textAlign: "center",
    borderColor: "rgb(0,0,0,0.8)",
    boxShadow: "1px 2px 1px 2px rgb(0,0,0,0.8)"

  },
  orderTextField:{
    width: "30%",
    marginLeft: "5px",
    marginRight: "5px",
    textAlign: "center"
  }
}));


//Table headers
const tableHeaders = ["Client", "Order ID", "Defect Type", "Description", "Comments", "Status", "Action Request", "Request Status"];

export default function QualityManagementClient() {
  //Styling
  const classes = useStyles();

  //Anchor for all dropdown menus
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  //Defect Data
  const [clientQMData, setClientQMData] = useState([]);
  
  //Modal variable for hiding and showing
  const [openDefectModal, setOpenDefectModal] = useState(false);

  //Orders data used to know if the defect id exists during submission
  const [respectiveOrders, setRespectiveOrders] = useState(new Array());

  //Defect Lists
  const defectListItems = ["My Defects"];

    useEffect(() => {
      let isMounted = true;

       //Fetch client claims
       axios({
        method: 'get',
        url: `${url}/api/v1/quality_management/client_claim`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
    }).then(res => {
        if (isMounted && res.status === 200) {
            setClientQMData(res.data.data);
        }
    }).catch(err => {
        console.error(err);
    });

      //Fetching Customer Transactions
      axios({
        method: 'get',
        url: `${url}/api/v1/accounting/ledger`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
     }).then(res => {
        if (res.status === 200 && isMounted) {
          var rows = Array();
          for(var i=0; i<res.data.data.length; i++){
            rows.push({...res.data.data[i]});
          }         
          setRespectiveOrders(rows);
        }
     }).catch(err => {
        console.error(err);
    });
    
    return ()=>{isMounted = false}
  }, []);

  //Open defect menu
  function handleClick (event: React.MouseEvent<HTMLButtonElement>){
    setAnchorEl(event.currentTarget);
  };
  
  //Toggles Submit form modal
  function toggleReportDefect(){
    setOpenDefectModal(!openDefectModal);
  }

  return (
    <>
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align = "center">
              <Button className = {classes.button} onClick={handleClick}>{defectListItems[0]}</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <div className={classes.root}>
      <form style = {{width:"100%"}}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            {tableHeaders.map((item, i)=>{
              return <TableCell key={i} align = "center">{item}</TableCell>
            })}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              clientQMData.map((row, key)=>{
                return ( 
                <TableRow key ={key}>
                  <TableCell align = "center">{row["name"]}</TableCell>
                  <TableCell align = "center">{row["orderid"]}</TableCell>
                  <TableCell align = "center">{row["defecttype"]}</TableCell>
                  <TableCell align = "center">{row["description"]}</TableCell>
                  <TableCell align = "center">{row["comments"]}</TableCell>
                  <TableCell align = "center">{row["status"]}</TableCell>
                  <TableCell align = "center">{row["clientrequest"]}</TableCell>
                  <TableCell align = "center">{row["requeststatus"]}</TableCell>
                </TableRow>
              )})}
            </TableBody> 
            <TableFooter>
              <TableRow>
              <TableCell colSpan={7}/>
                <TableCell align = "right">
                  <Button className={classes.button} onClick={()=>toggleReportDefect()}>Report a defect</Button>
                </TableCell>
              </TableRow>
            </TableFooter>
        </Table>
      </TableContainer>
      {/*Submit report modal */}
      <DefectForm open={openDefectModal} closePopup={toggleReportDefect} respectiveOrders = {respectiveOrders} role="Client" respectiveClaimSize = {clientQMData.length}/>
      </form>
    </div>
   
    </>
  );
}

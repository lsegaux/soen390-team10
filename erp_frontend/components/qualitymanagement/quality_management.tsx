/**
 * Template credit: https://material-ui.com/getting-started/templates/
 */

import React, {useState ,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  orderButton:{
    width: "40%",
    borderColor: "rgb(0,0,0,0.8)",
  },
  orderTextField:{
    width: "30%",
    marginLeft: "5px",
    marginRight: "5px",
    textAlign: "center"
  }
}));


//Table headers
const tableHeaders = ["Client", "Order ID", "Defect Type", "Description", "Comments", "Status", "Client Request", "Request Status"];

//Defect Lists
const defectListItems = ["Client Feedback List", "Vendor Defects List"];


export default function QualityManagement() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [clientQMData, setClientQMData] = useState([]);
  const [vendorQMData, setVendorQMData] = useState([]);

  const [listClientBool, setListClientBool] = useState(true);

  const [openDefectModal, setOpenDefectModal] = useState(false);

  const [clientOrders, setClientOrders] = useState(new Array());
  const [vendorOrders, setVendorOrders] = useState(new Array());


    useEffect(() => {
      let isMounted = true;

      //Fetch vendor claims
      axios({
          method: 'get',
          url: `${url}/api/v1/quality_management/vendor_claim`,
          headers: { "Content-Type": "application/json" },
      }).then(res => {
          if (isMounted && res.status === 200) {
              setVendorQMData(res.data.data);
          }
      }).catch(err => {
          console.error(err);
      });

       //Fetch client claims
       axios({
        method: 'get',
        url: `${url}/api/v1/quality_management/client_claim`,
        headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
     }).then(res => {
        if (res.status === 200 && isMounted) {
          var rows = Array();
          for(var i=0; i<res.data.data.length; i++){
            //Adding an orderid because the client order schema does not have an orderid attribute
            //Ideally, this changes and the schema adopts an actual orderid attribute
            rows.push({...res.data.data[i], id: (i+1)});
          }
          setClientOrders(rows);
        }
     }).catch(err => {
        console.error(err);
    });

      //Fetching Vendor Transactions
      axios({
        method: 'get',
        url: `${url}/api/v1/production/expenses`,
        headers: { "Content-Type": "application/json" },
     }).then(res => {
        if (res.status === 200 && isMounted) {
          var rows = Array();
          for(var i=0; i<res.data.data.length; i++){
            rows.push(res.data.data[i]);
          }
          setVendorOrders(rows);
        }
     }).catch(err => {
        console.error(err);
    });
    return ()=>{isMounted = false}
  }, []);
    
  function handleListSelect (key){
    if (key === 0) setListClientBool(true);

    if (key === 1) setListClientBool(false);
  }

  function handleClick (event: React.MouseEvent<HTMLButtonElement>){
    setAnchorEl(event.currentTarget);
  };


  function handleClose (){
    setAnchorEl(null);
  }

  
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
            <Button className = {classes.button} onClick={handleClick}>Menu</Button>
              <Menu id = "defectList" anchorEl = {anchorEl} keepMounted open = {Boolean(anchorEl)} onClose={handleClose}>
              {defectListItems.map((item, key)=>{
                return <MenuItem key={key} onClick = {()=>{handleListSelect(key);handleClose()}}>{item}</MenuItem>
              })}
              </Menu>
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
              (listClientBool?clientQMData:vendorQMData).map((row, key)=>{
                return ( 
                <TableRow key ={key}>
                  <TableCell align = "center">{row["name"]}</TableCell>
                  <TableCell align = "center">{row["orderid"]}</TableCell>
                  <TableCell align = "center">{row["defecttype"]}</TableCell>
                  <TableCell align = "center">{row["description"]}</TableCell>
                  <TableCell align = "center">{row["comments"]}</TableCell>
                  <TableCell align = "center">{row["status"]}</TableCell>
                  <TableCell align = "center">{listClientBool?row["clientrequest"]:row["vendorrequest"]}</TableCell>
                  <TableCell align = "center">{row["requeststatus"]}</TableCell>
                </TableRow>)
              })
            }
            </TableBody> 
            <TableFooter>
              <TableRow>
              <TableCell colSpan={4}/>
                <TableCell align = "center">
                  <Button className={classes.orderButton} onClick={()=>toggleReportDefect()}>Report a defect</Button>
                </TableCell>
              </TableRow>
            </TableFooter>
        </Table>
      </TableContainer>
      <DefectForm open={openDefectModal} closePopup={toggleReportDefect} vendorOrders = {vendorOrders} clientOrders = {clientOrders}/>
      </form>
    </div>
   
    </>
  );
}

/**
 * Template credit: https://material-ui.com/getting-started/templates/
 */

import React, {useState ,useEffect} from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
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

//Defect Lists
const defectListItems = (localStorage.getItem('role')=== "Client")?["My Defects"]:["Client Defect List", "Vendor Defects List"];

//Status options
const statusOption = ["Pending Review", "In progress", "Resolved"];

//Status options
const requestStatusOption = ["Decline", "Accept"];


export default function QualityManagement() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [anchorElStatus, setAnchorElStatus] = useState<null | HTMLElement>(null);
  const [anchorElRequest, setAnchorElRequest] = useState<null | HTMLElement>(null);
  const [rowSelectId,setRowSelectId] = useState(0);

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

  function handleStatusSelect(option){
    
    if (listClientBool){
        let index = clientQMData[rowSelectId]["claim_id"];

        axios({
            method: 'post',
            url: `${url}/api/v1/quality_management/client_claim/updateDefectStatus/id/${index}`,
            headers: { "Content-Type": "application/json" },
            data:{
                client_claim:{
                    status:option
                }
            }
          }).then((res)=>{
            if (res.status == 200) window.location.href = '/dashboard'
          }).catch(err => {
              console.error(err);
              alert("Status was not updated due to some error.");
          });
    }else{

        let index = vendorQMData[rowSelectId]["claim_id"];

        axios({
            method: 'post',
            url: `${url}/api/v1/quality_management/vendor_claim/updateDefectStatus/id/${index}`,
            headers: { "Content-Type": "application/json" },
            data:{
                vendor_claim:{
                    status:option
                }
            }
          }).then((res)=>{
            if (res.status == 200) window.location.href = '/dashboard'
          }).catch(err => {
              console.error(err);
              alert("Status was not updated due to some error.");
          });
    }
    
    handleClose();
  }

  function handleRequestSelect(option){

    if (listClientBool){
        let index = clientQMData[rowSelectId]["claim_id"];

        axios({
            method: 'post',
            url: `${url}/api/v1/quality_management/client_claim/updateDefectStatus/id/${index}`,
            headers: { "Content-Type": "application/json" },
            data:{
                client_claim:{
                    requeststatus:option
                }
            }
          }).then((res)=>{
            if (res.status == 200) window.location.href = '/dashboard'
          }).catch(err => {
              console.error(err);
              alert("Request status was not updated due to some error.");
          });
    }else{
        
        let index = vendorQMData[rowSelectId]["claim_id"];

        axios({
            method: 'post',
            url: `${url}/api/v1/quality_management/vendor_claim/updateDefectStatus/id/${index}`,
            headers: { "Content-Type": "application/json" },
            data:{
                vendor_claim:{
                    requeststatus:option
                }
            }
          }).then((res)=>{
            if (res.status == 200) window.location.href = '/dashboard'
          }).catch(err => {
              console.error(err);
              alert("Status was not updated due to some error.");
          });
    }
    
    handleClose();
  }

  function handleClick (event: React.MouseEvent<HTMLButtonElement>){
    setAnchorEl(event.currentTarget);
  };

  
  function handleClickStatus (event: React.MouseEvent<HTMLButtonElement>, key){
    setAnchorElStatus(event.currentTarget);
    setRowSelectId(key)
  };

  function handleClickRequest (event: React.MouseEvent<HTMLButtonElement>, key){
    setAnchorElRequest(event.currentTarget);
    setRowSelectId(key)
  };

  function handleClose (){
    setAnchorEl(null);
  }

  function handleCloseStatus (){
    setAnchorElStatus(null);
  }

  function handleCloseRequest (){
    setAnchorElRequest(null);
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
            <Button className = {classes.button} onClick={handleClick}>{listClientBool?defectListItems[0]:defectListItems[1]}</Button>
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
                if (localStorage.getItem('role') !== "Client" || localStorage.getItem('email') == row["name"])
                return ( 
                <TableRow key ={key}>
                  <TableCell align = "center">{row["name"]}</TableCell>
                  <TableCell align = "center">{row["orderid"]}</TableCell>
                  <TableCell align = "center">{row["defecttype"]}</TableCell>
                  <TableCell align = "center">{row["description"]}</TableCell>
                  <TableCell align = "center">{row["comments"]}</TableCell>
                  <TableCell align = "center"> 
                    {(localStorage.getItem('role')==="Administrator")?
                    <>
                    <Button className = {classes.button} onClick={(e)=>handleClickStatus(e,key)}>{row["status"]}</Button>
                      <Menu anchorEl = {anchorElStatus} keepMounted open = {Boolean(anchorElStatus)} onClose={handleCloseStatus}>
                      {statusOption.map((item, key2)=>{
                        return <MenuItem key={key2} onClick = {()=>{handleStatusSelect(item);}}>{item}</MenuItem>
                      })}
                      </Menu> 
                    </>
                    :
                    <>{row["status"]}</>
                    }
                     
                  </TableCell>
                  <TableCell align = "center">{listClientBool?row["clientrequest"]:row["vendorrequest"]}</TableCell>
                  <TableCell align = "center">
                  {(localStorage.getItem('role')==="Administrator")?
                    <>
                  <Button className = {classes.button} onClick={(e)=>handleClickRequest(e,key)}>{row["requeststatus"]}</Button>
                      <Menu anchorEl = {anchorElRequest} keepMounted open = {Boolean(anchorElRequest)} onClose={handleCloseRequest}>
                      {requestStatusOption.map((item, key2)=>{
                        return <MenuItem key={key2} onClick = {()=>{handleRequestSelect(item);}}>{item}</MenuItem>
                      })}
                      </Menu>
                      </>:
                      <>{row["requeststatus"]}</>} 
                    </TableCell>
                </TableRow>)
              })
            }
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
      <DefectForm open={openDefectModal} closePopup={toggleReportDefect} vendorOrders = {vendorOrders} clientOrders = {clientOrders}/>
      </form>
    </div>
   
    </>
  );
}

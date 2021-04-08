/**
 * Template credit: https://material-ui.com/getting-started/templates/
 */

import React, {useState ,useEffect} from "react";
import { makeStyles} from "@material-ui/core/styles";
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
import { getVendorTransactions, getClaims, updateDefectStatusClient, updateDefectStatusVendor, updateRequestStatusClient, updateRequestStatusVendor } from "../../utils/datafetcher";

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

//Status options
const statusOption = ["Pending Review", "In progress", "Resolved"];

//Status options
const requestStatusOption = ["Decline", "Accept"];


export default function QualityManagementEmployee() {
  //Styling
  const classes = useStyles();

  //Anchor for all dropdown menus
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElStatus, setAnchorElStatus] = useState<null | HTMLElement>(null);
  const [anchorElRequest, setAnchorElRequest] = useState<null | HTMLElement>(null);
  const [listClientBool, setListClientBool] = useState(true);

  //This variable keeps track of which table row was clicked on
  const [rowSelectId,setRowSelectId] = useState(0);
  
  //Defect Data
  const [clientQMData, setClientQMData] = useState([]);
  const [vendorQMData, setVendorQMData] = useState([]);
  
  //Modal variable for hiding and showing
  const [openDefectModal, setOpenDefectModal] = useState(false);

  //Orders data used to know if the defect id exists during submission
  const [respectiveOrders, setRespectiveOrders] = useState(new Array());

  //Defect Lists
  const defectListItems = ["Client Defect List", "Vendor Defects List"];

    useEffect(() => {
      let isMounted = true;

      //Fetch vendor claims
      getClaims('vendor_claim', res => setVendorQMData(res.data))

       //Fetch client claims
      getClaims('client_claim', res => setClientQMData(res.data)) 

      //Fetching Vendor Transactions
      getVendorTransactions(res => {
        var rows = Array();
          for(var i=0; i<res.data.length; i++){
            rows.push(res.data[i]);
          }
          setRespectiveOrders(rows);
      })

    return ()=>{isMounted = false}
  }, []);
    
  //Defect Menu tracking
  function handleListSelect (key){
    if (key === 0) setListClientBool(true);

    if (key === 1) setListClientBool(false);
  }

  //Update the status (only for Employees)
  function handleStatusSelect(option){
    
    if (listClientBool){

      //Client
        let index = clientQMData[rowSelectId]["claim_id"];

        updateDefectStatusClient(index, option, res => window.location.href = res)

    }else{ //Vendors

        let index = vendorQMData[rowSelectId]["claim_id"];
        updateDefectStatusVendor(index, option, res => window.location.href = res)
    }
    
    handleClose();
  }
  //Update the request status (only for Employees)
  function handleRequestSelect(option){

    if (listClientBool){
        let index = clientQMData[rowSelectId]["claim_id"];
      //Client
      updateRequestStatusClient(index, option, res => window.location.href = res)
    }else{ //Vendors
        
        let index = vendorQMData[rowSelectId]["claim_id"];
      updateRequestStatusVendor(index, option, res => window.location.href = res)
    }
    
    handleClose();
  }

  //Open defect menu
  function handleClick (event: React.MouseEvent<HTMLButtonElement>){
    setAnchorEl(event.currentTarget);
  };

  //Open Status menu (only for Employees)
  function handleClickStatus (event: React.MouseEvent<HTMLButtonElement>, key){
    setAnchorElStatus(event.currentTarget);
    setRowSelectId(key)
  };

  //Open Request Status menu (only for Employees)
  function handleClickRequest (event: React.MouseEvent<HTMLButtonElement>, key){
    setAnchorElRequest(event.currentTarget);
    setRowSelectId(key)
  };

  //Closes defect menu
  function handleClose (){
    setAnchorEl(null);
  }

  //Closes Status menu (only for Employees)
  function handleCloseStatus (){
    setAnchorElStatus(null);
  }

  //Closes Request status menu (only for Employees)
  function handleCloseRequest (){
    setAnchorElRequest(null);
  }
  
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
              {/* 
              Defect List Menu
              */}
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
              //Print table based on user role, and selected list
              (listClientBool?clientQMData:vendorQMData).map((row, key)=>{
                return ( 
                <TableRow key ={key}>
                  <TableCell align = "center">{row["name"]}</TableCell>
                  <TableCell align = "center">{row["orderid"]}</TableCell>
                  <TableCell align = "center">{row["defecttype"]}</TableCell>
                  <TableCell align = "center">{row["description"]}</TableCell>
                  <TableCell align = "center">{row["comments"]}</TableCell>
                  <TableCell align = "center">   
                    <Button className = {classes.button} onClick={(e)=>handleClickStatus(e,key)}>{row["status"]}</Button>
                      <Menu anchorEl = {anchorElStatus} keepMounted open = {Boolean(anchorElStatus)} onClose={handleCloseStatus}>
                      {statusOption.map((item, key2)=>{
                        return <MenuItem key={key2} onClick = {()=>{handleStatusSelect(item);}}>{item}</MenuItem>
                      })}
                      </Menu> 
                  </TableCell>
                  <TableCell align = "center">{listClientBool?row["clientrequest"]:row["vendorrequest"]}</TableCell>
                  <TableCell align = "center">
                  <Button className = {classes.button} onClick={(e)=>handleClickRequest(e,key)}>{row["requeststatus"]}</Button>
                      <Menu anchorEl = {anchorElRequest} keepMounted open = {Boolean(anchorElRequest)} onClose={handleCloseRequest}>
                      {requestStatusOption.map((item, key2)=>{
                        return <MenuItem key={key2} onClick = {()=>{handleRequestSelect(item);}}>{item}</MenuItem>
                      })}
                      </Menu>
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
      {/*Submit report modal */}
      <DefectForm open={openDefectModal} closePopup={toggleReportDefect} respectiveOrders = {respectiveOrders} role="Employee" respectiveClaimSize = {vendorQMData.length}/>
      </form>
    </div>
   
    </>
  );
}

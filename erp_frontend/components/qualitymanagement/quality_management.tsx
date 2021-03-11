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
const tableHeaders = ["Client", "Order ID", "Defect Type", "Description", "Comments", "Status", "Action Requested", "Action Status"];

//Defect Lists
const defectListItems = ["Client Feedback List", "Vendor Defects List"];

export default function QualityManagement() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [data, setData] = useState([]);
  const [openDefectModal, setOpenDefectModal] = useState(false);


    useEffect(() => {
      let isMounted = true;

      // axios({
      //     method: 'get',
      //     url: `${url}/api/v1/production/plants`,
      //     headers: { "Content-Type": "application/json" },
      // }).then(res => {
      //     if (isMounted && res.status === 200) {
      //         setAllPlants(res.data.data)
      //     }
      // }).catch(err => {
      //     console.error(err);
      // });

      return ()=>{isMounted = false}
   
    }, []);
    


  function handleListSelect (name){
    
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
                return <MenuItem key={key} onClick = {()=>{handleListSelect(item);handleClose()}}>{item}</MenuItem>
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
              [1,2,3].map((row, key)=>{
                return ( 
                <TableRow key ={key}>
                  <TableCell align = "center">Jogn</TableCell>
                  <TableCell align = "center">23</TableCell>
                  <TableCell align = "center">Damaged product</TableCell>
                  <TableCell align = "center">"cracked handlebar"</TableCell>
                  <TableCell align = "center">"unacceptable!"</TableCell>
                  <TableCell align = "center">Resolved</TableCell>
                  <TableCell align = "center">Replaced handlebars</TableCell>
                  <TableCell align = "center">Resolved</TableCell>
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
      <DefectForm open={openDefectModal} closePopup={toggleReportDefect}/>
      </form>
    </div>
   
    </>
  );
}

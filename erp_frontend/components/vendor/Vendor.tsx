/**
 * Template credit: https://material-ui.com/getting-started/templates/
 */

import React, {useState ,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";


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
    width: "25px",
    borderColor: "rgb(0,0,0,0.8)",
  },
  orderTextField:{
    width: "50px",
    marginLeft: "5px",
    marginRight: "5px"
  }
}));

//Remove once we can retrieve the data from the database
//Note for later: dynamic keys are set: {["key"]:"data"}
const hardData = {
  ["montreal"]:{
    materialList: [{
      name: "Bolt",
      stock: 12,
      vendor:"Wilson Inc.",
      pricePerUnit:0.49
    },
    {
      name: "Metal rod",
      stock: 6,
      vendor:"Wilson Inc.",
      pricePerUnit:6.49
    }]
  },["toronto"]:{
    materialList: [{
      name: "Cloth",
      stock: 121,
      vendor:"Wilson Inc.",
      pricePerUnit:0.49
    },
    {
      name: "Plastic Rod",
      stock: 12,
      vendor:"Wilson Inc.",
      pricePerUnit:6.49
    }]
  }

};

//Helper function to process the data from the database
/*function formatRow(name,stock,vendor,price){
  return {name:name,stock:stock,vendor:vendor,pricePerUnit:price}
}*/

//Table headers
const tableHeaders = ["Material", "Internal Stock", "Vendor", "Price Per Unit", "Order Material"];

export default function Vendor() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectPlantIndex, setSelectedPlantIndex] = useState("montreal");
  const data = useState(hardData);

  function handlePlantSelect (name){
    console.log(name)
    setSelectedPlantIndex(name);
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  function handleClose (){
    setAnchorEl(null);
  }
  
  return (
    <>
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align = "left">
            <Button className = {classes.button} onClick={handleClick}>Choose plant: {selectPlantIndex}</Button>
              <Menu id = "plant" anchorEl = {anchorEl} keepMounted open = {Boolean(anchorEl)} onClose={handleClose}>
              {Object.keys(data[0]).map((item, key)=>{
                return <MenuItem key={key} onClick = {()=>{handlePlantSelect(item);handleClose()}}>{item[0].toUpperCase() + item.substring(1)}</MenuItem>
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
              return <TableCell key={i}>{item}</TableCell>
            })}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data[0][selectPlantIndex]["materialList"].map((row, key)=>{
                return ( 
                <TableRow key ={key}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.stock}</TableCell>
                  <TableCell>{row.vendor}</TableCell>
                  <TableCell>{row.pricePerUnit}</TableCell>
                  <TableCell style = {{display:"flex"}}>
                      <Button className={classes.orderButton} startIcon={<RemoveCircleIcon/>}></Button>
                      <input className={classes.orderTextField}type = "text" placeholder="0"/>
                      <Button className={classes.orderButton} startIcon={<AddCircleIcon/>}></Button>
                  </TableCell>
                </TableRow>)
              })
            }
            </TableBody>  
        </Table>
      </TableContainer>
      </form>
    </div>
    </>
  );
}

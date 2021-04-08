/**
 * Template credit: https://material-ui.com/getting-started/templates/
 */

import React, {useState ,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";

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
import TableFooter from '@material-ui/core/TableFooter';

import Checkout from '../vendor/checkout';
import {getPlants, getPlantById} from '../../utils/datafetcher'

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
const tableHeaders = ["Material", "Internal Stock", "Vendor", "Price Per Unit", "Order Material"];

export default function Vendor() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectPlantIndex, setSelectedPlantIndex] = useState(0);
  const [allPlants, setAllPlants] = useState([]);
  const [data, setData] = useState([]);
  const [orderData,setOrderData] = useState(new Array());
  const [openCheckoutModal, setOpenCheckoutoutModal] = useState(false);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;


  //initializes array of 0 for order items
  useEffect(()=>{ 
      if (orderData.length ===0 ){
        setOrderData(new Array(data.length).fill(0));
      } 
  },[data]);

//Resets orders when changing plants
  useEffect(()=>{
      let isMounted = true;
      setOrderData(new Array(data.length).fill(0));
      getPlantById(selectPlantIndex, res => {setData(res.data)})

      return ()=>{isMounted = false}

},[selectPlantIndex]);

    useEffect(() => {
      let isMounted = true;

      getPlants(res => {setAllPlants(res.data)})
      getPlantById(selectPlantIndex, res => {setData(res.data)})      
      return ()=>{isMounted = false}
   
    }, []);
    
  function handlePlantSelect (name){
    setSelectedPlantIndex(name);
  }

  function handleClick (event: React.MouseEvent<HTMLButtonElement>){
    setAnchorEl(event.currentTarget);
  };


  function handleClose (){
    setAnchorEl(null);
  }

  function handleOrdering(ifAdd,key){  
    let temp = orderData;
    if (ifAdd){
      temp[key]++;
    }else{
      if(temp[key]!=0) temp[key]--
    }
    setOrderData([...temp]);
  }

  function toggleCheckout(){
    setOpenCheckoutoutModal(!openCheckoutModal);
  }

  function clearOrder(){
    setOrderData(new Array(data.length).fill(0));
    getPlantById(selectPlantIndex, res => {setData(res.data)})
  }
  return (
    <>
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align = "center">
            <Button className = {classes.button} onClick={handleClick}>Choose plant: {(allPlants[selectPlantIndex])? allPlants[selectPlantIndex]["name"]:""}</Button>
              <Menu id = "plant" anchorEl = {anchorEl} keepMounted open = {Boolean(anchorEl)} onClose={handleClose}>
              {Object.keys(allPlants).map((item, key)=>{
                return <MenuItem key={key} onClick = {()=>{handlePlantSelect(item);handleClose()}}>{allPlants[item].name}</MenuItem>
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
              data.map((row, key)=>{
                return ( 
                <TableRow key ={key}>
                  <TableCell align = "center">{row["name"]}</TableCell>
                  <TableCell align = "center">{row["quantity"]}</TableCell>
                  <TableCell align = "center">Wilson Inc</TableCell>
                  <TableCell align = "center">{row["price"]}</TableCell>
                  <TableCell align = "center" style = {{display:"flex"}}>
                      <Button className={classes.orderButton} startIcon={<RemoveCircleIcon/>} onClick={()=>handleOrdering(false, key)}></Button>
                      <div className={classes.orderTextField}>{orderData[key]}</div>
                      <Button className={classes.orderButton} startIcon={<AddCircleIcon/>} onClick={()=>handleOrdering(true,key)}></Button>
                  </TableCell>
                </TableRow>)
              })
            }
            </TableBody> 
            <TableFooter>
              <TableRow>
              <TableCell colSpan={4}/>
                <TableCell align = "center">
                  <Button disabled={(orderData.length !== 0 )?orderData.reduce(reducer,0) === 0:false} className={classes.orderButton} startIcon={<ShoppingCartIcon/>} onClick={()=>toggleCheckout()}>CHECKOUT</Button>
                </TableCell>
              </TableRow>
            </TableFooter>
        </Table>
      </TableContainer>
      <Checkout open={openCheckoutModal} closePopup={toggleCheckout} data = {data} order = {orderData} clearOrder={clearOrder}/>  
      </form>
    </div>
   
    </>
  );
}

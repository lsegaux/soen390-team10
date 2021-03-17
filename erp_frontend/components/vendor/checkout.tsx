import React, {useState} from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from 'axios';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from '@material-ui/core/TableFooter';

const url = 'http://localhost:4000';

const useStyles = makeStyles((theme) => ({
    popupCheckout:{
        margin:"auto",
        width: "50%",
        height: "50%",
        top: "10%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        backgroundColor: theme.palette.primary.main,
        boxShadow: "1px 2px 2px rgba(0,0,0,0.9)",
        borderColor: theme.palette.primary.main,
        borderRadius : "10px",
    },
    checkoutTable:{
        fontWeight: "bold",
        color: 'white'
    },
    checkoutButton:{
        width:"100%",
        height:"100%",
        background: theme.palette.primary.main,
        color:'white'
    },
    checkoutContainer:{
        height: '100%'
    }
  }));

  
const tableHeaders = ["Material", "Price Per Unit", "Quantity Ordering", "Cost"];

export default function Checkout({open, closePopup, order, data, clearOrder}){
    const classes = useStyles(useTheme());

    let total = 0;

    function calcMaterialPrice(qty,pricePerUnit){
        return qty * pricePerUnit;
    }
  
    function calcTotal(arrQty, arrMats){
        let temptotal = 0;
        for(let i = 0; i<arrQty.length;i++){
            temptotal+= (arrQty[i]*arrMats[i]["price"])
        }
        total = temptotal;
        return temptotal;
    }
  
    function handleCheckout(event){
      event.preventDefault();

      /**
       * Add items to our internal stock in the database
       * 
       */
      let success = true;

       for(let i = 0; i < order.length; i++){
           let success = true;
           if(order[i] !== 0 && success){
               axios({
                 method: 'post',
                 url: `${url}/api/v1/production/material/update/material_id/${data[i]["material_id"]}/quantity/${data[i]["quantity"] + order[i]}`,
                 headers: { "Content-Type": "application/json" },
               }).then(res => {
                   if (res.status === 200) {
                   }
               }).catch(err => {
                   console.error(err);
                   alert("Order was not processed.");
                    success = false;
               });
           }
       }

       if(success){
            axios({
                method: 'post',
                url: `${url}/api/v1/production/expense/create/amount/${total}/Wilson-Materials-Inc.`,
                headers: { "Content-Type": "application/json" },
            }).then(res => {
                if (res.status === 200) {
                }
            }).catch(err => {
                console.error(err);
            });
             
            total=0; 
            alert("Order was processed succesfully.");
       }

       clearOrder();
       closePopup();
    }

    return (
        <Modal open={open} onClose = {()=>closePopup()} className = {classes.popupCheckout}>
        <TableContainer className={classes.checkoutContainer}>
        <Table>
        <TableHead > 
            <TableRow >
            {tableHeaders.map((item, key)=>{
                return <TableCell  className={classes.checkoutTable} key ={key} align="center" >{item}</TableCell>
            })}
            </TableRow>
        </TableHead>
        <TableBody>  
            {order.map((item,key)=>{
                if (item !== 0){
                return <TableRow key = {key}> 
                    <TableCell className={classes.checkoutTable} align="center">{data[key]["name"]} </TableCell>
                    <TableCell className={classes.checkoutTable}align="center">{data[key]["price"]} </TableCell>
                    <TableCell className={classes.checkoutTable} align="center">{item} </TableCell>
                    <TableCell className={classes.checkoutTable} align="center">{calcMaterialPrice(item, data[key]["price"]).toFixed(2)} </TableCell>
                </TableRow> 
                }
            })}
        </TableBody> 
        <TableFooter>
            <TableRow>
                <TableCell colSpan={2} align = "center" />
                <TableCell align = "center">
                    <Button className={classes.checkoutButton} onClick={(event)=>handleCheckout(event)}>BUY</Button>
                </TableCell>
                <TableCell className={classes.checkoutTable} align = "center">
                    Total: {calcTotal(order, data).toFixed(2)}
                </TableCell>
            </TableRow>
        </TableFooter>
        </Table>
      </TableContainer>
        </Modal>
    )
};
import React from 'react';
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
    DefectFormTable:{
        fontWeight: "bold",
        color: 'white'
    },
    DefectFormButton:{
        width:"100%",
        height:"100%",
        background: theme.palette.primary.main,
        color:'white'
    },
    DefectFormContainer:{
        height: '100%'
    }
  }));
 

export default function DefectForm({open, closePopup}){
    const classes = useStyles(useTheme());

  
    function handleSubmit(event){
      event.preventDefault();

      /**
       * Add items to our internal stock in the database
       * 
       */

       

       closePopup();
    }

    return (
        <Modal open={open} onClose = {()=>closePopup()} className = {classes.popupCheckout}>
        <TableContainer>
        <Table>
        <TableHead > 
            <TableRow >
            {[1,2,3,4].map((item, key)=>{
                return <TableCell  className={classes.DefectFormTable} key ={key} align="center" >Header</TableCell>
            })}
            </TableRow>
        </TableHead>
        <TableBody>  
            {[1,2,3].map((item,key)=>{
                return <TableRow key = {key}> 
                    <TableCell className={classes.DefectFormTable} align="center">Uno</TableCell>
                    <TableCell className={classes.DefectFormTable}align="center">Dos</TableCell>
                    <TableCell className={classes.DefectFormTable} align="center">Tres</TableCell>
                    <TableCell className={classes.DefectFormTable} align="center">Quatro</TableCell>
                </TableRow>        
            })}
        </TableBody> 
        <TableFooter>
            <TableRow>
                <TableCell colSpan={2} align = "center" />
                <TableCell align = "center">
                    <Button className={classes.DefectFormButton} onClick={(event)=>handleSubmit(event)}>Submit Report</Button>
                </TableCell>
                <TableCell className={classes.DefectFormTable} align = "center">
                    
                </TableCell>
            </TableRow>
        </TableFooter>
        </Table>
        </TableContainer>
        </Modal>
    )
};
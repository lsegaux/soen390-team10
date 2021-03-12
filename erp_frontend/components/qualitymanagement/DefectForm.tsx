import React, {useState} from 'react';
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import axios from 'axios';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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
    },
    DefectDropDownButton:{
        width:"100%",
        textAlign: "center",
        borderColor: "rgb(0,0,0,0.8)",
        boxShadow: "1px 2px 1px 2px rgb(0,0,0,0.8)",
        background: "white",
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        color: "black"   
      }
  }));
 
//Defect types
const defectTypes = ["Damaged product", "Missing part/product", "Wrong product"];

//Request action
const requestActions = ["Replace product", "Refund"];

export default function DefectForm({open, closePopup}){
    const classes = useStyles(useTheme());
    const [anchorElDefect, setAnchorElDefect] = useState<null | HTMLElement>(null);
    const [anchorElRequest, setAnchorElRequest] = useState<null | HTMLElement>(null);
    //const [formData, setFormData] = useState({});

    const [formOrderID, setFormOrderID] = useState(-1);
    const [formDefectType, setFormDefectType] = useState("");
    const [formRequest, setFormRequest] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formComment, setFormComment] = useState("");


  
    function handleSubmit(event){
      event.preventDefault();

      /**
       * Add items to our internal stock in the database
       * 
       */

       

       closePopup();
    }

    function handleOrderID (e){
        //TO-DO: Check if orderID exists
        //Note: this check could be done during the submission

        //IF exist, it is valid and set the formOrderID state
        setFormOrderID(e.target.value);
        //ELSE it does not exist, it is no a valid orderID

    }

    function handleClickDefect (event: React.MouseEvent<HTMLButtonElement>){
        setAnchorElDefect(event.currentTarget);
    };

    function handleClickRequest (event: React.MouseEvent<HTMLButtonElement>){
        setAnchorElRequest(event.currentTarget);
    };

    function handleDefectType(item){
        setFormDefectType(item);
    }

    function handleRequestType(item){
        setFormRequest(item);
    }

    function handleCloseDefect (){
        setAnchorElDefect(null);
    }

    function handleCloseRequest (){
        setAnchorElRequest(null);
    }
    return (
        <Modal open={open} onClose = {()=>closePopup()} className = {classes.popupCheckout}>
        <TableContainer>
        <Table>
        <TableBody>  
            <TableRow> 
                <TableCell className={classes.DefectFormTable} align="left"><label>Order ID: </label><input type="text" size={10} onBlur = {(e)=>handleOrderID(e)}/></TableCell>
                <TableCell className={classes.DefectFormTable}align="center">
                    <Button className = {classes.DefectDropDownButton} onClick={handleClickDefect}>{(formDefectType === "" )? "Choose Defect Type":"Defect: "+formDefectType}</Button>
                    <Menu id = "defectList" anchorEl = {anchorElDefect} keepMounted open = {Boolean(anchorElDefect)} onClose={handleCloseDefect}>
                        {defectTypes.map((item, key)=> {return <MenuItem key={key} onClick = {()=>{handleDefectType(item);handleCloseDefect()}}>{item}</MenuItem>})}
                    </Menu>    
                </TableCell>
                <TableCell className={classes.DefectFormTable} align="right">
                    <Button className = {classes.DefectDropDownButton} onClick={handleClickRequest}>{(formRequest === "" )? "Choose Request Action":"Request: "+formRequest}</Button>
                    <Menu id = "defectList" anchorEl = {anchorElRequest} keepMounted open = {Boolean(anchorElRequest)} onClose={handleCloseRequest}>
                        {requestActions.map((item, key)=> {return <MenuItem key={key} onClick = {()=>{handleRequestType(item);handleCloseRequest()}}>{item}</MenuItem>})}
                    </Menu> 
                </TableCell>
            </TableRow>        
           
        </TableBody> 
        <TableFooter>
            <TableRow>
                <TableCell colSpan={2} align = "center"/>
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
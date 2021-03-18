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
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';


import Checkout from '../vendor/checkout';

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
    },
    table: {
        minWidth: 650,
      }
  }));

function createData(id, size, price) {
    return { id, size, price};
  }

const boxes = [
    createData(
        0,
        "small",
        0.09
    ),
    createData(
        1,
        "medium",
        0.14
    ),
    createData(
        2,
        "large",
        0.19
    ),
    createData(
        2,
        "xlarge",
        0.24
    )
  ]

  const tableHeaders = ["Size", "Internal Stock", "Price Per Unit", "Order Boxes"];

export default function Packaging() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectPlantIndex, setSelectedPlantIndex] = useState(0);
    const [allPlants, setAllPlants] = useState([]);
    const [data, setData] = useState([]);
    const [orderData,setOrderData] = useState(new Array());
    const [openCheckoutModal, setOpenCheckoutoutModal] = useState(false);
    const [weight, setWeight] = useState(0);
    const [orderId, setOrderId] = useState(0);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
  
  
    //initializes array of 0 for order items
    useEffect(()=>{ 
        if (orderData.length ===0 ){
          setOrderData(new Array(5).fill(0));
        } 
    },[data]);
  
  //Resets orders when changing plants
    useEffect(()=>{
        let isMounted = true;
        setOrderData(new Array(5).fill(0));
  
        axios({
          method: 'get',
          url: `${url}/api/v1/packaging/boxes/${selectPlantIndex}`,
          headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('jwt') },
        }).then(res => {
            if (isMounted && res.status === 200) {
              console.log('514data ', res.data);
              setData(res.data);
            }
        }).catch(err => {
            console.error(err);
        });
  
        return ()=>{isMounted = false}
  
  },[selectPlantIndex]);
  
      useEffect(() => {
        let isMounted = true;
  
  
          axios({
            method: 'get',
            url: `${url}/api/v1/production/plants`,
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            if (isMounted && res.status === 200) {
                setAllPlants(res.data.data)
            }
        }).catch(err => {
            console.error(err);
        });
  
        axios({
          method: 'get',
          url: `${url}/api/v1/packaging/boxes/${selectPlantIndex}`,
          headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('jwt') },
        }).then(res => {
            if (isMounted && res.status === 200) {
              setData(res.data);
            }
        }).catch(err => {
            console.error(err);
        });
        
        return ()=>{isMounted = false}
     
      }, []);
      
      // useEffect(() => {}, [])
  
  
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

    function orderBoxes(){

    }
  
    function toggleCheckout(){
      setOpenCheckoutoutModal(!openCheckoutModal);
    }

    function handleSubmit(event){
      event.preventDefault();
      
      axios({
        method: 'post',
        url: `${url}/api/v1/packaging/reduce_quantity`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('jwt')},
      }).then(res => {
          if (res.status === 200) {
          }
      }).catch(err => {
          console.error(err);
      });
    }
  
    function clearOrder(){
      setOrderData(new Array(5).fill(0));
      
      axios({
        method: 'get',
        url: `${url}/api/v1/packaging/boxes/${selectPlantIndex}`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('jwt')},
      }).then(res => {
          if (res.status === 200) {
            setData(res.data);
          }
      }).catch(err => {
          console.error(err);
      });
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
                (Object.entries(data)).map((row, key)=>{
                  if(row[0] == "plant_id"){
                    return;
                  }
                  return ( 
                  <TableRow key ={key}>
                    <TableCell align = "center">{row[0]}</TableCell>
                    <TableCell align = "center">{row[1]}</TableCell>
                    <TableCell align = "center">{boxes[0].price}</TableCell>
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
                    <Button disabled={(orderData.length !== 0 )?orderData.reduce(reducer,0) === 0:false} className={classes.orderButton} startIcon={<ShoppingCartIcon/>} onClick={()=>orderBoxes()}>CHECKOUT</Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
          </Table>
        </TableContainer>
        {/* <Checkout open={openCheckoutModal} closePopup={toggleCheckout} data = {data} order = {orderData} clearOrder={clearOrder}/>   */}
        </form>
      </div>
      <form onSubmit={handleSubmit}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>
                Packaged Order
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Order Id: </TableCell>
                <TableCell align="right"><Input name="orderId" onChange={() => setOrderId}></Input></TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Package Weight: </TableCell>
                <TableCell align="right"><Input name="packageWeight" onChange={() => setWeight}></Input></TableCell>
            </TableRow>
            <TableRow>
                <TableCell></TableCell>
                <TableCell align="right"><input type="submit" className={classes.orderButton} value="Submit"></input></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            </TableBody>
        </Table>
      </TableContainer>
      </form>
      </>
    );
  }

  // class PackageOrderForm extends React.Component {

  //   readonly classes = useStyles();

  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       orderId: 0,
  //       packageWeight: 10
  //     }

  //     this.handleSubmit = this.handleSubmit.bind(this);
  //   }

  //   handleSubmit(event) {
  //     const target = event.target;
  //     const value = target.value;
  //     const name = target.name;

  //     this.setState({
  //       [name]: value
  //     })

  //     console.log('514value ', value)
  //   }

  //   render() {
  //     return (
  //       <form onSubmit={this.handleSubmit}>
  //     <TableContainer component={Paper}>
  //       <Table className={this.classes.table} aria-label="simple table">
  //           <TableHead>
  //           <TableRow>
  //               <TableCell>
  //               Packaged Order
  //               </TableCell>
  //           </TableRow>
  //           <TableRow>
  //               <TableCell>Order Id: </TableCell>
  //               <TableCell align="right"><Input name="orderId"></Input></TableCell>
  //           </TableRow>
  //           <TableRow>
  //               <TableCell>Package Weight: </TableCell>
  //               <TableCell align="right"><Input name="packageWeight"></Input></TableCell>
  //           </TableRow>
  //           <TableRow>
  //               <TableCell></TableCell>
  //               <TableCell align="right"><input type="submit" className={this.classes.orderButton}>Submit</input></TableCell>
  //           </TableRow>
  //           </TableHead>
  //           <TableBody>
  //           </TableBody>
  //       </Table>
  //     </TableContainer>
  //     </form>
  //     )
  //   }
  // }

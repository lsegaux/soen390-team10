/**
 * Template credit: https://material-ui.com/getting-started/templates/
 */

import React, {useState ,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";

import MenuItem from '@material-ui/core/MenuItem';
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
import Select from '@material-ui/core/Select';

import {getBoxesInfo, getPlants, reduceBoxes, postOrderBoxes, dispatchPackage} from '../../utils/datafetcher'


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
  })
);

const boxes = [
  {
    id: 0,
    size: "small",
    price: 0.09
  },
  {
    id: 1,
    size: "medium",
    price: 0.14
  },
  {
    id: 2,
    size: "large",
    price: 0.19
  },
  {
    id: 3,
    size: "xlarge",
    price: 0.24
  }
]

const tableHeaders = ["Size", "Internal Stock", "Price Per Unit", "Order Boxes"];
const boxNames = ["Small", "Medium", "Large", "XLarge"]

export default function Packaging() {
  const classes = useStyles();
  const [selectPlantIndex, setSelectedPlantIndex] = useState(0);
  const [allPlants, setAllPlants] = useState([] as any);

  const [data, setData] = useState<any>([]);
  const [orderData, setOrderData] = useState(new Array());
  const [openCheckoutModal, setOpenCheckoutoutModal] = useState(false);

  const [weight, setWeight] = useState(0);
  const [orderId, setOrderId] = useState(0);

  const [plantPickerOpen, setPlantPickerOpen] = useState(false)

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  function handlePlantSelect (name){
    setSelectedPlantIndex(name);
    refreshData(name)
  }

  useEffect(()=>{
    if(allPlants.length == 0){
      refreshData(0)
      setSelectedPlantIndex(0)
      clearOrder()
    }
  })

  function handleOrdering(plus, key){  
    let temp = orderData;
    if (plus){
      temp[key]++;
    }else{
      if(temp[key]!=0) 
        temp[key]--
    }
    setOrderData([...temp]);
  }
  
  function toggleCheckout(){
    setOpenCheckoutoutModal(!openCheckoutModal);
  }

  function refreshData(index){
    getPlants(res => {setAllPlants(res.data)})
    getBoxesInfo(index == null ? selectPlantIndex : index, (data) => {
      const d : any = data
      setData([data.small, data.medium, data.large, data.xlarge]);
    })
  }

  function orderBoxes(){
    postOrderBoxes(selectPlantIndex, orderData, () => {
      refreshData(null)
      clearOrder()
    })
  }

  function handleSubmitDispatchPackage(event){
    event.preventDefault();
    
    dispatchPackage(orderId, weight, selectPlantIndex, () => {
      refreshData(null)
    })
  }

  function clearOrder(){
    setOrderData(new Array(5).fill(0))
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align = "center">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectPlantIndex}
              >
                {
                  allPlants && allPlants.length > 0 && allPlants.map((item, key)=>{
                    return (
                      <MenuItem key={key} value={key} onClick={()=>{ handlePlantSelect(key) }}>
                        {(allPlants[key] as any).name}
                      </MenuItem>
                    )
                  })
                }
                
              </Select>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <div className={classes.root}>
      <form style = {{width:"100%"}}>
      <TableContainer component={Paper}>
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
              (data.map((row, key)=>{
                if(row[0] == "plant_id"){return}
                return ( 
                <TableRow key ={key}>
                  <TableCell align = "center">{boxes[key].size}</TableCell>
                  <TableCell align = "center">{data[key]}</TableCell>
                  <TableCell align = "center">{boxes[key].price}</TableCell>
                  <TableCell align = "center" style = {{display:"flex"}}>
                      <Button className={classes.orderButton} startIcon={<RemoveCircleIcon/>} onClick={()=>handleOrdering(false, key)}></Button>
                      <div className={classes.orderTextField}>{orderData[key]}</div>
                      <Button className={classes.orderButton} startIcon={<AddCircleIcon/>} onClick={()=>handleOrdering(true,key)}></Button>
                  </TableCell>
                </TableRow>)
              }))
            }
            </TableBody> 
            <TableFooter>
              <TableRow>
              <TableCell colSpan={4}/>
                <TableCell align = "center">
                  <Button 
                  disabled={(orderData.length !== 0 ) ? orderData.reduce(reducer,0) === 0 : false} 
                  className={classes.orderButton} startIcon={<ShoppingCartIcon/>} 
                  onClick={() => orderBoxes()}>
                    CHECKOUT
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
        </Table>
      </TableContainer>
      </form>
    </div>
    <form>
    <br></br>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
              <TableCell>
              Dispatch Package
              </TableCell>
          </TableRow>
          <TableRow>
              <TableCell>Order Id: </TableCell>
              <TableCell align="right"><Input name="orderId" placeholder={"0"} onChange={(val) => setOrderId((val.target.value) as any)}></Input></TableCell>
          </TableRow>
          <TableRow>
              <TableCell>Package Weight: </TableCell>
              <TableCell align="right"><Input name="packageWeight" placeholder={"0"} onChange={(val) => setWeight((val.target.value) as any)}></Input></TableCell>
          </TableRow>
          <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">
                <Button 
                  onClick={handleSubmitDispatchPackage} 
                  type="submit" 
                  startIcon={<ShoppingCartIcon/>} 
                  className={classes.orderButton} 
                  value="Submit">
                </Button>
                </TableCell>
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

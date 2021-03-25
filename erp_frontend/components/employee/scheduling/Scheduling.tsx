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

//Temporary data
const tempData = [
    {"id": 0, 
    "job":"Assembling wheels", 
    "status":"In use", 
    "start_time": "02:00", 
    "end_time":"14:00", 
    "cost": 4.00},
    {"id": 1, 
    "job":"Assembling seats", 
    "status":"Not used", 
    "start_time": "14:00", 
    "end_time":"02:00", 
    "cost": 4.50},
    {"id": 2, 
    "job":"N/A", 
    "status":"Maintenance", 
    "start_time": "--", 
    "end_time":"--", 
    "cost": 7.00},
    {"id": 3, 
    "job":"N/A", 
    "status":"Maintenance", 
    "start_time": "--", 
    "end_time":"--", 
    "cost": 13.00},
    {"id": 4, 
    "job":"Assembling pedals", 
    "status":"In use", 
    "start_time": "00:00", 
    "end_time":"12:00", 
    "cost": 6.50},
    {"id": 5, 
    "job":"Packaging", 
    "status":"In use", 
    "start_time": "06:00", 
    "end_time":"23:00", 
    "cost": 3.50}
  ]

//Table headers
const tableHeaders = ["Machine ID", "Current Job", "Status", "Start Time", "End Time", "Cost per hour", "Stop"];

export default function Scheduling() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectPlantIndex, setSelectedPlantIndex] = useState(0);
  const [allPlants, setAllPlants] = useState([]);
  const [data, setData] = useState(new Array());


  useEffect(()=>{
      let isMounted = true;

      //To do:
      //When retrieve machines when plant is changes

      // axios({
      //   method: 'get',
      //   url: `${url}/api/v1/production/material/plant_id/${selectPlantIndex}`,
      //   headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
      // }).then(res => {
      //     if (isMounted && res.status === 200) {
      //       setData(res.data.data);
      //     }
      // }).catch(err => {
      //     console.error(err);
      // });

      //Remove when backend is integrated, and uncomment ^^^
      setData(tempData);
      return ()=>{isMounted = false}

},[selectPlantIndex]);

    useEffect(() => {
      let isMounted = true;


      axios({
          method: 'get',
          url: `${url}/api/v1/production/plants`,
          headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
      }).then(res => {
          if (isMounted && res.status === 200) {
              setAllPlants(res.data.data)
          }
      }).catch(err => {
          console.error(err);
      });

      //TO DO:
      //Retrieve machines based off plants

      // axios({
      //   method: 'get',
      //   url: `${url}/api/v1/production/material/plant_id/${selectPlantIndex}`,
      //   headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
      // }).then(res => {
      //     if (isMounted && res.status === 200) {
      //       setData(res.data.data);
      //     }
      // }).catch(err => {
      //     console.error(err);
      // });

      //Remove when backend is integrated, and uncomment ^^^
      setData(tempData);
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

  //Force stops the machine
  function handleForceStop(machine){
    alert("You have forced stopped machine: " + machine["id"]+ ".")

    //TO DO:
    //Update machine in the backing to force stop
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
                  <TableCell align = "center">{row["id"]}</TableCell>
                  <TableCell align = "center">{row["job"]}</TableCell>
                  <TableCell align = "center">{row["status"]}</TableCell>
                  <TableCell align = "center">{row["start_time"]}</TableCell>
                  <TableCell align = "center">{row["end_time"]}</TableCell>
                  <TableCell align = "center">{row["cost"].toFixed(2)}</TableCell>
                  <TableCell align = "center">
                    <Button className = {classes.button} onClick={()=>handleForceStop(row)}>Force Stop</Button>
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

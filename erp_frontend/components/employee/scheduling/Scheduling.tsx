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

      //When retrieve machines when plant is changes
      axios({
        method: 'get',
        url: `${url}/api/v1/scheduling/machines/plant_id/${selectPlantIndex}`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
      }).then(res => {
          if (isMounted && res.status === 200) {
            setData(res.data.data);
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
          headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
      }).then(res => {
          if (isMounted && res.status === 200) {
              setAllPlants(res.data.data)
          }
      }).catch(err => {
          console.error(err);
      });

      //Retrieve machines based off plants
      axios({
        method: 'get',
        url: `${url}/api/v1/scheduling/machines/plant_id/${selectPlantIndex}`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
      }).then(res => {
          if (isMounted && res.status === 200) {
            setData(res.data.data);
          }
      }).catch(err => {
          console.error(err);
      });

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
    alert("You have forced stopped machine: " + machine["machine_id"]+ ".")

    //TO DO:
    //Update machine in the backing to force stop
    axios({
      method: 'post',
      url: `${url}/api/v1/scheduling/machines/machine_id/${machine["machine_id"]}/status/Stopped`,
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
    }).then(res => {
      window.location.reload();
    })
    .catch(err => {
        console.error(err);
    });
  }

  // Check the status of a machine depending on its start time, end time and if it has been forced stopped
  function determineMachineStatus(start, end, currentStatus){
    const today = new Date();
    const time = (today.getHours() + 3)%24 + ":" + today.getMinutes() + ":" + today.getSeconds();

    if(currentStatus == "Stopped")
      return "Stopped";
    else
      if(start < time && time < end)
        return "In use";
      else
        return "Not in use";

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
                  <TableCell align = "center">{row["machine_id"]}</TableCell>
                  <TableCell align = "center">{row["job"]}</TableCell>
                  <TableCell align = "center">{determineMachineStatus(row["start_time"], row["end_time"], row["status"])}</TableCell>
                  <TableCell align = "center">{row["start_time"]}</TableCell>
                  <TableCell align = "center">{row["end_time"]}</TableCell>
                  <TableCell align = "center">{row["cost_per_hour"].toFixed(2)}</TableCell>
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

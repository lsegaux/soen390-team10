/**
 * Template credit: https://material-ui.com/getting-started/templates/
 */

import React, {useState ,useEffect} from "react";
import { makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from '@material-ui/core/TableFooter';

import DefectForm from './DefectForm';
import { getClaims, getLedger } from "../../utils/datafetcher";

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
  orderTextField:{
    width: "30%",
    marginLeft: "5px",
    marginRight: "5px",
    textAlign: "center"
  }
}));


//Table headers
const tableHeaders = ["Client", "Order ID", "Defect Type", "Description", "Comments", "Status", "Action Request", "Request Status"];

export default function QualityManagementClient() {
  //Styling
  const classes = useStyles();

  //Defect Data
  const [clientQMData, setClientQMData] = useState([]);
  const [countAllQMData,setCountAllQMData] = useState(0)
  
  //Modal variable for hiding and showing
  const [openDefectModal, setOpenDefectModal] = useState(false);

  //Orders data used to know if the defect id exists during submission
  const [respectiveOrders, setRespectiveOrders] = useState(new Array());

  //Defect Lists
  const defectListItems = ["My Defects"];

    useEffect(() => {
      let isMounted = true;

      //Fetch client claims
      getClaims('client_claim', res => setCountAllQMData(res.data.length))

      //Fetch client claims
      getClaims('client_claim/client', res => setClientQMData(res.data))

      //Fetching Customer Transactions
      getLedger(res => {
        var rows = Array();
        for(var i=0; i<res.data.length; i++){
          rows.push({...res.data[i]});
        }
        setRespectiveOrders(rows);
      })
    return ()=>{isMounted = false}
  }, []);
 
  //Toggles Submit form modal
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
              <Button className = {classes.button}>{defectListItems[0]}</Button>
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
              clientQMData.map((row, key)=>{
                return ( 
                <TableRow key ={key}>
                  <TableCell align = "center">{row["name"]}</TableCell>
                  <TableCell align = "center">{row["orderid"]}</TableCell>
                  <TableCell align = "center">{row["defecttype"]}</TableCell>
                  <TableCell align = "center">{row["description"]}</TableCell>
                  <TableCell align = "center">{row["comments"]}</TableCell>
                  <TableCell align = "center">{row["status"]}</TableCell>
                  <TableCell align = "center">{row["clientrequest"]}</TableCell>
                  <TableCell align = "center">{row["requeststatus"]}</TableCell>
                </TableRow>
              )})}
            </TableBody> 
            <TableFooter>
              <TableRow>
              <TableCell colSpan={7}/>
                <TableCell align = "right">
                  <Button className={classes.button} onClick={()=>toggleReportDefect()}>Report a defect</Button>
                </TableCell>
              </TableRow>
            </TableFooter>
        </Table>
      </TableContainer>
      {/*Submit report modal */}
      <DefectForm open={openDefectModal} closePopup={toggleReportDefect} respectiveOrders = {respectiveOrders} role="Client" respectiveClaimSize = {countAllQMData}/>
      </form>
    </div>
   
    </>
  );
}

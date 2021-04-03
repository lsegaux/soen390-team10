import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MenuBook from '@material-ui/icons/MenuBook'

export default function MainListItems({setCurrentPage}){
 return <div>
 <ListItem button onClick= {()=>setCurrentPage(0)}>
   <ListItemIcon>
     <DashboardIcon />
   </ListItemIcon>
   <ListItemText primary="Dashboard" />
 </ListItem>
 <ListItem button onClick= {()=>setCurrentPage(1)}>
   <ListItemIcon>
     <BarChartIcon />
   </ListItemIcon>
   <ListItemText primary="Vendors" />
 </ListItem>
 <ListItem button onClick= {()=>setCurrentPage(2)}>
   <ListItemIcon>
     <ShoppingCartIcon />
   </ListItemIcon>
   <ListItemText primary="Accounting" />
 </ListItem>
 <ListItem button onClick= {()=>setCurrentPage(3)}>
   <ListItemIcon>
     <AssignmentTurnedInIcon />
   </ListItemIcon>
   <ListItemText primary="Quality Management" />
 </ListItem>
 <ListItem button onClick= {()=>setCurrentPage(4)}>
   <ListItemIcon>
     <LayersIcon />
   </ListItemIcon>
   <ListItemText primary="Inventory" />
 </ListItem>
 <ListItem button onClick= {()=>setCurrentPage(5)}>
   <ListItemIcon>
     <CardTravelIcon />
   </ListItemIcon>
   <ListItemText primary="Packaging" />
 </ListItem>
 <ListItem button onClick= {()=>setCurrentPage(6)}>
   <ListItemIcon>
     <LocalShippingIcon />
   </ListItemIcon>
   <ListItemText primary="Shipping" />
 </ListItem>
 <ListItem button onClick= {()=>setCurrentPage(7)}>
   <ListItemIcon>
     <ScheduleIcon />
   </ListItemIcon>
   <ListItemText primary="Scheduling" />
 </ListItem>
 <ListItem button onClick= {()=>setCurrentPage(8)}>
   <ListItemIcon>
     <MenuBook />
   </ListItemIcon>
   <ListItemText primary="Planning" />
 </ListItem>
</div>

}




